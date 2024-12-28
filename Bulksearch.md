# Amazon Bulk Search Volume

    This endpoint provides search volume values for up to 1,000 keywords in one API request. Search volume represents the approximate number of monthly searches for a keyword on Amazon. Results are specific to the keywords, location, and language parameters specified in the POST request.

    ## API Endpoint
    ```bash
    # Instead of 'login' and 'password' use your credentials from https://app.dataforseo.com/api-access 
    login="login" 
    password="password" 
    cred="$(printf ${login}:${password} | base64)" 
    curl --location --request POST "https://api.dataforseo.com/v3/dataforseo_labs/amazon/bulk_search_volume/live" \
    --header "Authorization: Basic ${cred}"  \
    --header "Content-Type: application/json" \
    --data-raw "[
        {
            "keywords": [
                "buy laptop",
                "cheap laptops for sale",
                "purchase laptop"
            ],
            "location_code": 2840,
            "language_code": "en"
        }
    ]"
    ```

    ## Example Response
    ```json
    {
        "version": "0.1.20220216",
        "status_code": 20000,
        "status_message": "Ok.",
        "time": "0.1129 sec.",
        "cost": 0.0103,
        "tasks_count": 1,
        "tasks_error": 0,
        "tasks": [
            {
                "id": "02231530-2806-0397-0000-d83c09581bd4",
                "status_code": 20000,
                "status_message": "Ok.",
                "time": "0.0378 sec.",
                "cost": 0.0103,
                "result_count": 1,
                "path": [
                    "v3",
                    "dataforseo_labs",
                    "amazon",
                    "bulk_search_volume",
                    "live"
                ],
                "data": {
                    "api": "dataforseo_labs",
                    "function": "bulk_search_volume",
                    "se_type": "amazon",
                    "language_name": "English",
                    "location_code": 2840,
                    "keywords": [
                        "phone",
                        "iphone",
                        "samsung"
                    ]
                },
                "result": [
                    {
                        "se_type": "amazon",
                        "location_code": 2840,
                        "language_code": "en",
                        "total_count": 3,
                        "items_count": 3,
                        "items": [
                            {
                                "se_type": "amazon",
                                "keyword": "phone",
                                "search_volume": 33100
                            },
                            {
                                "se_type": "amazon",
                                "keyword": "iphone",
                                "search_volume": 53100
                            },
                            {
                                "se_type": "amazon",
                                "keyword": "samsung",
                                "search_volume": 26800
                            }
                        ]
                    }
                ]
            }
        ]
    }
    ```

    ## Request Parameters

    | Field Name | Type | Description |
    |------------|------|-------------|
    | keywords | array | Required. Target keywords (max 1000). UTF-8 encoded, converted to lowercase. |
    | location_name | string | Required if location_code not specified. Full location name. |
    | location_code | integer | Required if location_name not specified. Location code. |
    | language_name | string | Required if language_code not specified. Full language name. |
    | language_code | string | Required if language_name not specified. Language code. |
    | tag | string | Optional. User-defined task identifier (max 255 characters). |

    ## Supported Locations and Languages
    - Australia (2036, en)
    - Austria (2040, de)
    - Canada (2124, en)
    - Egypt (2818, ar)
    - France (2250, fr)
    - Germany (2276, de)
    - India (2356, en)
    - Italy (2380, it)
    - Mexico (2484, es)
    - Netherlands (2528, nl)
    - Saudi Arabia (2682, ar)
    - Singapore (2702, en)
    - Spain (2724, es)
    - United Arab Emirates (2784, ar)
    - United Kingdom (2826, en)
    - United States (2840, en)

    ## Response Fields

    | Field Name | Type | Description |
    |------------|------|-------------|
    | version | string | Current API version |
    | status_code | integer | General status code |
    | status_message | string | General informational message |
    | time | string | Execution time in seconds |
    | cost | float | Total tasks cost in USD |
    | tasks_count | integer | Number of tasks in array |
    | tasks_error | integer | Number of failed tasks |
    | tasks | array | Array of task results |

    ### Task Result Fields
    - id: Unique task identifier (UUID)
    - status_code: Task status code (10000-60000)
    - status_message: Task informational message
    - time: Task execution time
    - cost: Task cost in USD
    - result_count: Number of results
    - path: URL path
    - data: Original request parameters
    - result: Array of search volume results

    ## Rate Limits
    - Maximum 2000 API calls per minute
    - Maximum 30 simultaneous requests
    - Maximum 1000 keywords per request

    ## Notes
    - Your account will be charged for each request
    - All POST data must be in JSON format (UTF-8 encoding)
    - Keywords are automatically converted to lowercase
