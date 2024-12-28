import React, { useState } from 'react';
import './App.css';
import CreditCheck from './CreditCheck';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const StickyNote = () => {
    const handleDownload = () => {
      const content = selectedKeywords
        .map(kw => `${kw.keyword} - ${kw.volume} searches/month`)
        .join('\n');
      
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'selected_keywords.txt';
      link.click();
      URL.revokeObjectURL(url);
    };

    const handleClearAll = () => {
      setSelectedKeywords([]);
    };

    const handleRemoveKeyword = (keyword) => {
      setSelectedKeywords(prev => 
        prev.filter(kw => kw.keyword !== keyword)
      );
    };

    return (
      <div className="sticky-note">
        <div className="sticky-header">
          <h3>Selected Keywords</h3>
        </div>
        <div className="sticky-content">
          {selectedKeywords.length > 0 ? (
            <ul>
              {selectedKeywords.map((kw, index) => (
                <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="keyword-text">
                    {kw.keyword} - {kw.volume} searches/month
                  </span>
                  <button 
                    className="remove-keyword"
                    onClick={() => handleRemoveKeyword(kw.keyword)}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#ff4444',
                      cursor: 'pointer',
                      fontSize: '1.2em',
                      padding: '0 0 0 10px'
                    }}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            'Click keywords to add them here'
          )}
        </div>
        {selectedKeywords.length > 0 && (
          <div className="sticky-actions">
            <button 
              className="download-button"
              onClick={handleDownload}
              style={{ marginTop: '10px' }}
            >
              Download Selected Keywords
            </button>
          </div>
        )}
      </div>
    );
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Copied to clipboard!'))
      .catch(() => alert('Failed to copy'));
  };

  // Check if environment variables are loaded
  if (!import.meta.env.VITE_API_LOGIN || !import.meta.env.VITE_API_PASSWORD) {
    console.error('Environment variables are not loaded properly');
  }

  const API_CREDENTIALS = btoa(`${import.meta.env.VITE_API_LOGIN}:${import.meta.env.VITE_API_PASSWORD}`);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.dataforseo.com/v3/dataforseo_labs/amazon/related_keywords/live', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${API_CREDENTIALS}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([{
          keyword: query.toLowerCase(),
          language_name: 'English',
          location_code: 2840,
          limit: 100,
          include_seed_keyword: true,
          depth: 2
        }])
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.tasks?.[0]?.result?.[0]?.items) {
        setError('No results found for this keyword.');
        setResults([]);
        return;
      }

      const relatedKeywords = data.tasks[0].result[0].items
        .filter(item => item.keyword_data?.keyword_info?.search_volume >= 100)
        .map(item => ({
          keyword: item.keyword_data.keyword,
          volume: item.keyword_data.keyword_info.search_volume
        }));

      setResults(relatedKeywords);
    } catch (error) {
      console.error('Error:', error);
      setError(`Failed to fetch results: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="main-content">
        <div className="hero-section">
          <h1>Amazon Keyword Tool</h1>
          <p className="subtitle">
            Find what people are searching for on Amazon, and<br />
            align your product listings with those terms.
          </p>
          
          <div className="search-options">
            <div className="search-types">
              <span className="active">Related Keywords</span>
            </div>
            
            <div className="search-container">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Enter keyword"
                className="search-input"
              />
              <button onClick={handleSearch} disabled={loading} className="search-button">
                {loading ? 'Searching...' : 'Find keywords'}
              </button>
            </div>

            {error && <div className="maintenance-notice">
              <span className="notice-icon">ⓘ</span>
              {error}
            </div>}
          </div>
        </div>

        <h2 className="results-title">Find the best keyword ideas</h2>

        <div className="results">
          {results
            .slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage)
            .map((result, index) => (
              <div 
                key={index} 
                className="result-item"
                onClick={() => {
                  if (!selectedKeywords.some(kw => kw.keyword === result.keyword)) {
                    setSelectedKeywords(prev => [
                      ...prev,
                      { keyword: result.keyword, volume: result.volume }
                    ]);
                  }
                }}
              >
                <span className="keyword">{result.keyword}</span>
                <span className="volume">{result.volume} searches/month</span>
              </div>
            ))}
          {results.length > resultsPerPage && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>Page {currentPage}</span>
              <button
                onClick={() => setCurrentPage(prev => 
                  Math.min(Math.ceil(results.length / resultsPerPage), prev + 1)
                )}
                disabled={currentPage === Math.ceil(results.length / resultsPerPage)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      
      <StickyNote />
      <CreditCheck />
    </div>
  );
}

export default App;
