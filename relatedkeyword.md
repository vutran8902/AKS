# Related Keywords

    The Related Keywords endpoint provides keywords appearing in the "Related Searches" section on Amazon.

    ## Overview
    - Get up to 1554 keyword ideas by specifying the search depth
    - Each related keyword comes with search volume information
    - Datasource: DataForSEO Amazon SERP Database
    - Search algorithm: depth-first search for queries appearing in the "Related Searches" section on Amazon for the specified seed keyword

    ## Example
    ```bash
    # Instead of 'login' and 'password' use your credentials from https://app.dataforseo.com/api-access
    login="login" \
    password="password" \
    cred="$(printf ${login}:${password} | base64)" \
    curl --location --request POST "https://api.dataforseo.com/v3/dataforseo_labs/amazon/related_keywords/live" \
    --header "Authorization: Basic ${cred}"  \
    --header "Content-Type: application/json" \
    --data-raw "[
       {
           "keyword": "computer mouse",
           "language_name": "English",
           "location_code": 2840,
           "limit": 5,
           "include_seed_keyword": true
       }
    ]"
    ```

    ## Response Structure
    ```json
    {
       "version": "0.1.20220216",
       "status_code": 20000,
       "status_message": "Ok.",
       "time": "0.1167 sec.",
       "cost": 0.0105,
       "tasks_count": 1,
       "tasks_error": 0,
       "tasks": [
           {
               "id": "02231607-2806-0387-0000-7a6b40425329",
               "status_code": 20000,
               "status_message": "Ok.",
               "time": "0.0268 sec.",
               "cost": 0.0105,
               "result_count": 1,
               "path": [
                   "v3",
                   "dataforseo_labs",
                   "amazon",
                   "related_keywords",
                   "live"
               ],
               "data": {
                   "api": "dataforseo_labs",
                   "function": "related_keywords",
                   "se_type": "amazon",
                   "keyword": "computer mouse",
                   "language_name": "English",
                   "location_code": 2840,
                   "limit": 5,
                   "include_seed_keyword": true
               },
               "result": [
                   {
                       "se_type": "amazon",
                       "seed_keyword": "computer mouse",
                       "seed_keyword_data": {
                           "se_type": "amazon",
                           "keyword": "computer mouse",
                           "location_code": 2840,
                           "language_code": "en",
                           "keyword_info": {
                               "se_type": "amazon",
                               "last_updated_time": "2022-02-15 21:44:19 +00:00",
                               "search_volume": 9200
                           }
                       },
                       "location_code": 2840,
                       "language_code": "en",
                       "total_count": 7,
                       "items_count": 5,
                       "items": [
                           {
                               "se_type": "amazon",
                               "keyword_data": {
                                   "se_type": "amazon",
                                   "keyword": "mouse pad",
                                   "location_code": 2840,
                                   "language_code": "en",
                                   "keyword_info": {
                                       "se_type": "amazon",
                                       "last_updated_time": "2022-02-15 21:45:04 +00:00",
                                       "search_volume": 193400
                                   }
                               },
                               "depth": 1,
                               "related_keywords": null
                           },
                           {
                               "se_type": "amazon",
                               "keyword_data": {
                                   "se_type": "amazon",
                                   "keyword": "gaming mouse",
                                   "location_code": 2840,
                                   "language_code": "en",
                                   "keyword_info": {
                                       "se_type": "amazon",
                                       "last_updated_time": "2022-02-15 22:01:20 +00:00",
                                       "search_volume": 132600
                                   }
                               },
                               "depth": 1,
                               "related_keywords": null
                           },
                           {
                               "se_type": "amazon",
                               "keyword_data": {
                                   "se_type": "amazon",
                                   "keyword": "computer mouse",
                                   "location_code": 2840,
                                   "language_code": "en",
                                   "keyword_info": {
                                       "se_type": "amazon",
                                       "last_updated_time": "2022-02-15 21:44:19 +00:00",
                                       "search_volume": 9200
                                   }
                               },
                               "depth": 0,
                               "related_keywords": [
                                   "computer mouse wireless",
                                   "mouse pad",
                                   "computer mouse wired",
                                   "computer mouse logitech",
                                   "computer mouse pad",
                                   "gaming mouse"
                               ]
                           },
                           {
                               "se_type": "amazon",
                               "keyword_data": {
                                   "se_type": "amazon",
                                   "keyword": "computer mouse wireless",
                                   "location_code": 2840,
                                   "language_code": "en",
                                   "keyword_info": {
                                       "se_type": "amazon",
                                       "last_updated_time": "2022-02-15 20:56:16 +00:00",
                                       "search_volume": 3100
                                   }
                               },
                               "depth": 1,
                               "related_keywords": [
                                   "computer mouse",
                                   "mouse pad",
                                   "computer mouse wireless logitech",
                                   "computer mouse wireless ergonomic",
                                   "computer mouse wired",
                                   "computer mouse pad"
                               ]
                           },
                           {
                               "se_type": "amazon",
                               "keyword_data": {
                                   "se_type": "amazon",
                                   "keyword": "computer mouse wired",
                                   "location_code": 2840,
                                   "language_code": "en",
                                   "keyword_info": {
                                       "se_type": "amazon",
                                       "last_updated_time": "2022-02-15 20:56:10 +00:00",
                                       "search_volume": 2200
                                   }
                               },
                               "depth": 1,
                               "related_keywords": [
                                   "computer mouse",
                                   "mouse pad",
                                   "computer mouse wireless",
                                   "computer mouse wired gaming",
                                   "computer mouse pad",
                                   "wired mouse"
                               ]
                           }
                       ]
                   }
               ]
           }
       ]
    }
    ```

    ## API Details
    - **Endpoint**: `POST https://api.dataforseo.com/v3/dataforseo_labs/amazon/related_keywords/live`
    - **Cost**: Your account will be charged for each request
    - **Rate Limit**: Up to 2000 API calls per minute, maximum 30 simultaneous requests

    ## Task Parameters
    | Field Name | Type | Description |
    |------------|------|-------------|
    | keyword | string | Required. The seed keyword in lowercase |
    | location_name | string | Required if location_code not specified |
    | location_code | integer | Required if location_name not specified |
    | language_name | string | Required if language_code not specified |
    | language_code | string | Required if language_name not specified |
    | depth | integer | Optional. Search depth (0-4) |
    | include_seed_keyword | boolean | Optional. Include seed keyword data |
    | ignore_synonyms | boolean | Optional. Exclude similar keywords |
    | limit | integer | Optional. Maximum results (default 100) |
    | offset | integer | Optional. Results offset |
    | tag | string | Optional. User-defined task identifier |
