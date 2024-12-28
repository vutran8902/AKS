import React, { useState, useEffect } from 'react';
import Airtable from 'airtable';

const base = new Airtable({apiKey: 'patRODWf8Q1O75R07'}).base('apptqoHrGcwVpVpxG');

const CreditCheck = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const getSoftrUserEmail = async () => {
    try {
      const response = await fetch('https://api.softr.io/v1/users/me', {
        headers: {
          'Authorization': `Bearer 00c4IDRVkHsS6M6eKp5bKtpMc`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Softr API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.email;
    } catch (error) {
      console.error('Error fetching user email:', error);
      throw error;
    }
  };

  const checkCredit = async () => {
    setLoading(true);
    try {
      const userEmail = await getSoftrUserEmail();
      
      const records = await base('tbl8k5dQAZTrTEuzZ').select({
        filterByFormula: `{Email} = '${userEmail}'`
      }).firstPage();

      if (records.length === 0) {
        setMessage('User not found');
        return;
      }

      const record = records[0];
      const subscriptionPoints = record.get('Subscription points');
      
      if (subscriptionPoints >= 50) {
        await base('tbl8k5dQAZTrTEuzZ').update([
          {
            id: record.id,
            fields: {
              'Points Use': (record.get('Points Use') || 0) + 50,
              'Subscription points': subscriptionPoints - 50
            }
          }
        ]);
        setMessage('50 credits deducted successfully');
      } else {
        setMessage('Not enough Credit');
      }
    } catch (error) {
      if (error.message.includes('Softr API')) {
        setMessage('Authentication error');
      } else if (error.message.includes('Airtable')) {
        setMessage('Credit system error');
      } else {
        setMessage('System error');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkCredit();
  }, []);

  return (
    <div>
      {loading ? 'Processing...' : message}
    </div>
  );
};

export default CreditCheck;
