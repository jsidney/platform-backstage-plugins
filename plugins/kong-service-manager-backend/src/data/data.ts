export const PluginsInfoData = {
    categories: [
      {
        category: "AI",
        plugins: [
          {
            name: "AI Proxy",
            slug: "ai-proxy",
            description: "Call supported Large Language Model vendors and models through Kong Gateway, using mediated data formats and authentication",
            tags: ["OSS"],
            image: "/assets/ai/kong-inc_ai-proxy.png"
          },
          {
            name: "AI Prompt Decorator",
            slug: "ai-prompt-decorator",
            description: "Prepend or append an array of llm/v1/chat messages to a user's chat history",
            tags: ["OSS"],
            image: "/assets/ai/kong-inc_ai-prompt-decorator.png"
          },
          {
            name: "AI Prompt Guard",
            slug: "ai-prompt-guard",
            description: "Check llm/v1/chat or llm/v1/completions requests against a list of allowed or denied expressions",
            tags: ["OSS"],
            image: "/assets/ai/kong-inc_ai-prompt-guard.png"
          },
          {
            name: "AI Prompt Template",
            slug: "ai-prompt-template",
            description: "Provide fill-in-the-blank AI prompts to users",
            tags: ["OSS"],
            image: "/assets/ai/kong-inc_ai-prompt-template.png"
          },
          {
            name: "AI Request Transformer",
            slug: "ai-request-transformer",
            description: "Use an LLM service to inspect and transform the client's request body prior to proxying the request to the upstream server",
            tags: ["OSS"],
            image: "/assets/ai/kong-inc_ai-request-transformer.png"
          },
          {
            name: "AI Response Transformer",
            slug: "ai-response-transformer",
            description: "Use an LLM service to examine the upstream HTTP(S) prior to forwarding it to the client",
            tags: ["OSS"],
            image: "/assets/ai/kong-inc_ai-response-transformer.png"
          }
        ]
      },
      {
        category: "Authentication",
        plugins: [
          {
            name: "Basic Authentication",
            slug: "basic-auth",
            description: "Add Basic Authentication to your services",
            tags: ["OSS"],
            image: "/assets/auth/kong-inc_basic-auth.png"
            
          },
          {
            name: "HMAC Auth",
            slug: "hmac-auth",
            description: "Add HMAC Authentication to your services",
            tags: ["OSS"],
            image: "/assets/auth/kong-inc_hmac-auth.png"
            
          },
          {
            name: "JWE Decrypt",
            slug: "jwe-decrypt",
            description: "Decrypt a JWE token in a request",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: "/assets/auth/kong-inc_jwe-decrypt.png"
            
          },
          {
            name: "JWT",
            slug: "jwt",
            description: "Verify and authenticate JSON Web Tokens",
            tags: ["OSS"],
            image: "/assets/auth/kong-inc_jwt.png"
            
          },
          {
            name: "Key Auth",
            slug: "key-auth",
            description: "Add key authentication to your Services",
            tags: ["OSS"],
            image: "/assets/auth/kong-inc_key-auth.png"
            
          },
          {
            name: "Key Authentication - Encrypted",
            slug: "key-auth-enc",
            description: "Add key authentication to your services",
            tags: ["ENTERPRISE"],
            image: "/assets/auth/kong-inc_key-auth-enc.png"
            
          },
          {
            name: "Kong JWT Signer",
            slug: "jwt-signer",
            description: "Verify and sign one or two tokens in a request",
            tags: ["ENTERPRISE"],
            image: "/assets/auth/kong-inc_jwt-signer.png"
            
          },
          {
            name: "LDAP Authentication",
            slug: "ldap-auth",
            description: "Integrate Kong with an LDAP server",
            tags: ["OSS"],
            image: "/assets/auth/kong-inc_ldap-auth.png"
            
          },
          {
            name: "LDAP Authentication Advanced",
            slug: "ldap-auth-advanced",
            description: "Secure Kong with username and password protection, use LDAP search and service directory mapping",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: "/assets/auth/kong-inc_ldap-auth-advanced.png"
            
          },
          {
            name: "Mutual TLS Authentication",
            slug: "mtls-auth",
            description: "Secure routes and services with client certificate and mutual TLS authentication",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: "/assets/auth/kong-inc_mtls-auth.png"
            
          },
          {
            name: "OAuth 2.0 Authentication",
            slug: "oauth2",
            description: "Add OAuth 2.0 authentication to your service",
            tags: ["OSS"],
            image: "/assets/auth/kong-inc_oauth2.png"
            
          },
          {
            name: "OAuth 2.0 Introspection",
            slug: "oauth2-introspection",
            description: "Integrate Kong with a third-party OAuth 2.0 Authorization Server",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: "/assets/auth/kong-inc_oauth2-introspection.png"
            
          },
          {
            name: "OpenID Connect",
            slug: "openid-connect",
            description: "Integrate Kong with a third-party OpenID Connect provider",
            tags: ["KONNECT PREMIUM", "ENTERPRISE"],
            image: "/assets/auth/kong-inc_openid-connect.png"
            
          },
          {
            name: "Portal Application Registration",
            slug: "application-registration",
            description: "Allow portal developers to register applications against services",
            tags: ["ENTERPRISE"],
            image: "/assets/auth/kong-inc_application-registration.png"
            
          },
          {
            name: "SAML",
            slug: "saml",
            description: "Provides SAML v2.0 authentication and authorization between a service provider (Kong) and an identity provider (IdP)",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: "/assets/auth/kong-inc_saml.png"
            
          },
          {
            name: "Session",
            slug: "session",
            description: "Support sessions for Kong authentication plugins.",
            tags: ["OSS"],
            image: "/assets/auth/kong-inc_session.png"
            
          },
          {
            name: "Vault Authentication",
            slug: "vault-auth",
            description: "Add Vault authentication to your services",
            tags: ["ENTERPRISE"],
            image: "/assets/auth/kong-inc_vault-auth.png"
            
          },
          {
            name: "Okta",
            slug: "okta",
            description: "Integrate Okta's API Access Management (OAuth as a Service) with Kong API Gateway",
            tags: ["ENTERPRISE", "TECH PARTNER"],
            image: "/assets/auth/okta_okta.png"
            
          }
        ]
      },
      {
        category: "Security",
        plugins: [
          {
            name: "ACME",
            slug: "acme",
            description: "Let's Encrypt and ACMEv2 integration with Kong Gateway",
            tags: ["OSS"],
            image: "/assets/security/kong-inc_acme.png"
          },
          {
            name: "Bot Detection",
            slug: "bot-detection",
            description: "Detect and block bots or custom clients",
            tags: ["OSS"],
            image: "/assets/security/kong-inc_bot-detection.png"
          },
          {
            name: "CORS",
            slug: "cors",
            description: "Allow developers to make requests from the browser",
            tags: ["OSS"],
            image: "/assets/security/kong-inc_cors.png"
          },
          {
            name: "IP Restriction",
            slug: "ip-restriction",
            description: "Allow or deny IPs that can make requests to your services",
            tags: ["OSS"],
            image: "/assets/security/kong-inc_ip-restriction.png"
          },
          {
            name: "OPA",
            slug: "opa",
            description: "Authorize requests against Open Policy Agent",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: "OpaImg"
          },
          {
            name: "TLS Handshake Modifier",
            slug: "tls-handshake-modifier",
            description: "Requests a client to present its client certificate",
            tags: ["ENTERPRISE"],
            image: "/assets/security/kong-inc_tls-handshake-modifier.png"
          },
          {
            name: "TLS Metadata Headers",
            slug: "tls-metadata-headers",
            description: "Proxies TLS client certificate metadata to upstream services via HTTP headers",
            tags: ["ENTERPRISE"],
            image: "/assets/security/kong-inc_tls-metadata-headers.png"
          },
          {
            name: "Imperva API Security",
            slug: "imp-appsec-connector",
            description: "Integrate Kong Gateway with Imperva API Security to discover, monitor, and protect APIs",
            tags: ["ENTERPRISE", "TECH PARTNER"],
            image: "/assets/security/imperva_imp-appsec-connector.png"
          }
        ]
      },
      {
        category: "Traffic Control",
        plugins: [
          {
            name: "ACL",
            slug: "acl",
            description: "Control which consumers can access services",
            tags: ["OSS"],
            image: "/assets/traffic-control/kong-inc_acl.png"
          },
          {
            name: "Canary Release",
            slug: "canary",
            description: "Slowly roll out software changes to a subset of users",
            tags: ["KONNECT PREMIUM", "ENTERPRISE"],
            image: "/assets/traffic-control/kong-inc_canary.png"
          },
          {
            name: "Forward Proxy Advanced",
            slug: "forward-proxy",
            description: "Allows Kong to connect to intermediary transparent HTTP proxies",
            tags: ["KONNECT PREMIUM", "ENTERPRISE"],
            image: "/assets/traffic-control/kong-inc_forward-proxy.png"
          },
          {
            name: "GraphQL Proxy Caching Advanced",
            slug: "graphql-proxy-cache-advanced",
            description: "Cache and serve commonly requested responses in Kong",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: "/assets/traffic-control/kong-inc_graphql-proxy-cache-advanced.png"
          },
          {
            name: "GraphQL Rate Limiting Advanced",
            slug: "graphql-rate-limiting-advanced",
            description: "Provide rate limiting for GraphQL queries",
            tags: ["KONNECT PREMIUM", "ENTERPRISE"],
            image: "/assets/traffic-control/kong-inc_graphql-rate-limiting-advanced.png"
          },
          {
            name: "Mocking",
            slug: "mocking",
            description: "Provide mock endpoints to test your APIs against your services",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: "/assets/traffic-control/kong-inc_mocking.png"
          },
          {
            name: "OAS Validation",
            slug: "oas-validation",
            description: "Validate HTTP requests and responses based on an OpenAPI 3.0 or Swagger API Specification",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: "/assets/traffic-control/kong-inc_oas-validation.png"
          },
          {
            name: "Proxy Cache",
            slug: "proxy-cache",
            description: "Cache and serve commonly requested responses in Kong",
            tags: ["OSS"],
            image: "/assets/traffic-control/kong-inc_proxy-cache.png"
          },
          {
            name: "Proxy Caching Advanced",
            slug: "proxy-cache-advanced",
            description: "Cache and serve commonly requested responses in Kong",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: "/assets/traffic-control/kong-inc_proxy-cache-advanced.png"
          },
          {
            name: "Rate Limiting",
            slug: "rate-limiting",
            description: "Rate limit how many HTTP requests can be made in a period of time",
            tags: ["OSS"],
            image: "/assets/traffic-control/kong-inc_rate-limiting.png"
          },
          {
            name: "Rate Limiting Advanced",
            slug: "rate-limiting-advanced",
            description: "Upgrades Kong Rate Limiting with more flexibility and higher performance",
            tags: ["KONNECT PREMIUM", "ENTERPRISE"],
            image: "/assets/traffic-control/kong-inc_rate-limiting-advanced.png"
          },
          {
            name: "Request Size Limiting",
            slug: "request-size-limiting",
            description: "Block requests with bodies greater than a specified size",
            tags: ["OSS"],
            image: "/assets/traffic-control/kong-inc_request-size-limiting.png"
          },
          {
            name: "Request Termination",
            slug: "request-termination",
            description: "Terminates all requests with a specific response",
            tags: ["OSS"],
            image: "/assets/traffic-control/kong-inc_request-termination.png"
          },
          {
            name: "Request Validator",
            slug: "request-validator",
            description: "Validates requests before they reach the upstream service",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: "/assets/traffic-control/kong-inc_request-validator.png"
          },
          {
            name: "Response Rate Limiting",
            slug: "response-ratelimiting",
            description: "Rate limit based on a custom response header value",
            tags: ["OSS"],
            image: "/assets/traffic-control/kong-inc_response-ratelimiting.png"
          },
          {
            name: "Route By Header",
            slug: "route-by-header",
            description: "Route request based on request headers",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: "/assets/traffic-control/kong-inc_route-by-header.png"
          },
          {
            name: "Upstream Timeout",
            slug: "upstream-timeout",
            description: "Set timeouts on routes and override service-level timeouts",
            tags: ["KONNECT PREMIUM", "ENTERPRISE"],
            image: "/assets/traffic-control/kong-inc_upstream-timeout.png"
          },
          {
            name: "WebSocket Size Limit",
            slug: "websocket-size-limit",
            description: "Block incoming WebSocket messages greater than a specified size",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: "/assets/traffic-control/kong-inc_websocket-size-limit.png"
          },
          {
            name: "WebSocket Validator",
            slug: "websocket-validator",
            description: "Validate WebSocket messages before they are proxied",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: "/assets/traffic-control/kong-inc_websocket-validator.png"
          },
          {
            name: "XML Threat Protection",
            slug: "xml-threat-protection",
            description: "Apply structural and size checks on XML payloads",
            tags: ["KONNECT PREMIUM", "ENTERPRISE"],
            image: "/assets/traffic-control/kong-inc_xml-threat-protection.png"
          }
        ]
      },
      {
        category: "Serverless",
        plugins: [
          {
            name: "AWS Lambda",
            slug: "aws-lambda",
            description: "Invoke and manage AWS Lambda functions from Kong",
            tags: ["OSS"],
            image: "/assets/serverless/kong-inc_aws-lambda.png"
          },
          {
            name: "Apache OpenWhisk",
            slug: "openwhisk",
            description: "Invoke and manage OpenWhisk actions from Kong",
            tags: ["OSS"],
            image: "/assets/serverless/kong-inc_openwhisk.png"
          },
          {
            name: "Azure Functions",
            slug: "azure-functions",
            description: "Invoke and manage Azure functions from Kong",
            tags: ["OSS"],
            image: "/assets/serverless/kong-inc_azure-functions.png"
          },
          {
            name: "Kong Functions (Post-Plugin)",
            slug: "pos-function",
            description: "Add and manage custom Lua functions to run after other plugins",
            tags: ["OSS"],
            image: "/assets/serverless/kong-inc_post-function.png"
          },
          {
            name: "Kong Functions (Pre-Plugins)",
            slug: "pre-function",
            description: "Add and manage custom Lua functions to run before other plugins",
            tags: ["OSS"],
            image: "/assets/serverless/kong-inc_pre-function.png"
          }
        ]
      },
      {
        category: "Analitics & Monitoring",
        plugins: [
          {
            name: "AppDynamics",
            slug: "app-dynamics",
            description: "Integrate Kong with the AppDynamics APM Platform",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: "/assets/analytics-monitoring/kong-inc_app-dynamics.png"
          },
          {
            name: "Datadog",
            slug: "datadog",
            description: "Visualize metrics on Datadog",
            tags: ["OSS"],
            image: "/assets/analytics-monitoring/kong-inc_datadog.png"
          },
          {
            name: "OpenTelemetry",
            slug: "opentelemetry",
            description: "Propagate spans and report space to a backend server through OTLP protocol",
            tags: ["OSS"],
            image: "/assets/analytics-monitoring/kong-inc_opentelemetry.png"
          },
          {
            name: "Prometheus",
            slug: "prometheus",
            description: "Expose metrics related to Kong and proxied upstream services in Prometheus exposition format",
            tags: [""],
            image: "/assets/analytics-monitoring/kong-inc_prometheus.png"
          },
          {
            name: "StatsD",
            slug: "statsd",
            description: "Send metrics to StatsD",
            tags: [""],
            image: "/assets/analytics-monitoring/kong-inc_statsd.png"
          },
          {
            name: "StatsD Advanced",
            slug: "statsd-advanced",
            description: "(Deprecated) Send metrics to StatsD with more flexible options",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: "/assets/analytics-monitoring/kong-inc_statsd-advanced.png"
          },
          {
            name: "Zipkin",
            slug: "zipkin",
            description: "Propagate Zipkin spans and report space to a Zipkin server",
            tags: ["OSS"],
            image: "/assets/analytics-monitoring/kong-inc_zipkin.png"
          }
        ]
      },
      {
        category: "Transformations",
        plugins: [
          {
            name: "Correlation ID",
            slug: "correlation-id",
            description: "Correlate requests and responses using a unique ID",
            tags: ["OSS"],
            image: "/assets/transformations/kong-inc_correlation-id.png"
          },
          {
            name: "DeGraphQL",
            slug: "degraphql",
            description: "Transform a GraphQL upstream into a REST API",
            tags: ["KONNECT PREMIUM", "ENTERPRISE"],
            image: "/assets/transformations/kong-inc_degraphql.png"
          },
          {
            name: "Exit Transformer",
            slug: "exit-transformer",
            description: "Customize Kong exit responses sent downstream",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: "/assets/transformations/kong-inc_exit-transformer.png"
          },
          {
            name: "Kafka Upstream",
            slug: "krafka-upstream",
            description: "Transform requests into Kafka messages in a Kafka topic",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: "/assets/transformations/kong-inc_kafka-upstream.png"
          },
          {
            name: "Request Transformer",
            slug: "request-transformer",
            description: "Use regular expressions, variables, and templates to transform requests",
            tags: ["OSS"],
            image: "/assets/transformations/kong-inc_request-transformer.png"
          },
          {
            name: "Request Transformer Advanced",
            slug: "request-transformer-advanced",
            description: "Use powerful regular expressions, variables, and templates to transform API requests",
            tags: ["KONNECT PREMIUM", "ENTERPRISE"],
            image: "/assets/transformations/kong-inc_request-transformer-advanced.png"
          },
          {
            name: "Response Transformer",
            slug: "response-transformer",
            description: "Modify the upstream response before returning it to the client",
            tags: ["OSS"],
            image: "/assets/transformations/kong-inc_response-transformer.png"
          },
          {
            name: "Response Transformer Advanced",
            slug: "response-transformer-advanced",
            description: "Modify the upstream response before returning it to the client, with greater customization capabilities",
            tags: ["KONNECT PREMIUM", "ENTERPRISE"],
            image: "/assets/transformations/kong-inc_response-transformer-advanced.png"
          },
          {
            name: "Route Transformer Advanced",
            slug: "route-transformer-advanced",
            description: "Transform routing by changing the upstream server, port, or path",
            tags: ["KONNECT PREMIUM", "ENTERPRISE"],
            image: "/assets/transformations/kong-inc_route-transformer-advanced.png"
          },
          {
            name: "gRPC-Web",
            slug: "grpc-web",
            description: "Allow browser clients to call gRPC services",
            tags: ["OSS"],
            image: "/assets/transformations/kong-inc_grpc-web.png"
          },
          {
            name: "gRPC-gateway",
            slug: "grpc-gateway",
            description: "Access gRPC services through HTTP REST",
            tags: ["OSS"],
            image: "/assets/transformations/kong-inc_grpc-gateway.png"
          },
          {
            name: "Jq",
            slug: "jq",
            description: "Transform JSON objects included in API requests or responses using jq programs",
            tags: ["KONNECT PREMIUM", "ENTERPRISE"],
            image: "/assets/transformations/kong-inc_jq.png"
          }
        ]
      },
      {
        category: "Logging",
        plugins: [
          {
            name: "File Log",
            slug: "file-log",
            description: "Append request and response data to a log file",
            tags: ["OSS"],
            image: "/assets/logging/kong-inc_file-log.png"
          },
          {
            name: "HTTP Log",
            slug: "http-log",
            description: "Send request and response logs to an HTTP server",
            tags: ["OSS"],
            image: "/assets/logging/kong-inc_http-log.png"
          },
          {
            name: "Kafka Log",
            slug: "krafka-log",
            description: "Publish logs to a Kafka topic",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: "/assets/logging/kong-inc_kafka-log.png"
          },
          {
            name: "Loggly",
            slug: "loggly",
            description: "Send request and response logs to Loggly",
            tags: ["OSS"],
            image: "/assets/logging/kong-inc_loggly.png"
          },
          {
            name: "Syslog",
            slug: "syslog",
            description: "Send request and response logs to Syslog",
            tags: ["OSS"],
            image: "/assets/logging/kong-inc_syslog.png"
          },
          {
            name: "TCP Log",
            slug: "tcp-log",
            description: "Send request and response logs to a TCP server",
            tags: ["OSS"],
            image: "/assets/logging/kong-inc_tcp-log.png"
          },
          {
            name: "UDP Log",
            slug: "udp-log",
            description: "Send request and response logs to a UDP server",
            tags: ["OSS"],
            image: "/assets/logging/kong-inc_udp-log.png"
          }
        ]
      }
    ]
  }
    