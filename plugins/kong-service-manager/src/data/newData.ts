
import {
    AiProxyImg,
    AiPromptDecoratorImg,
    AiPromptGuardImg,
    AiPromptTemplateImg,
    AiRequestTransformerImg,
    AiResponseTransformerImg,
    BasicAuthImg,
    HmacAuthImg,
    JweDecryptImg,
    JwtImg,
    KeyAuthImg,
    KeyAuthEncImg,
    JwtSignerImg,
    LdapAuthImg,
    LdapAuthAdvancedImg,
    MtlsAuthImg,
    Oauth2Img,
    Oauth2IntrospectionImg,
    OpenidConnectImg,
    AppRegistrationImg,
    SamlImg,
    SessionImg,
    VaultAuthImg,
    OktaImg,
    AcmeImg,
    BotDetectionImg,
    CorsImg,
    IpRestrictionImg,
    OpaImg,
    TlsHandshakeModifierImg,
    TlsMetadataHeadersImg,
    ImpervaApiSecurityImg,
    AclImg,
    CanaryImg,
    ForwardProxyImg,
    GraphQLProxyCacheAdvancedImg,
    GraphQLRateLimitingAdvancedImg,
    MockingImg,
    OasValidationImg,
    ProxyCacheImg,
    ProxyCacheAdvancedImg,
    RateLimitingImg,
    RateLimitingAdvancedImg,
    RequestSizeLimitingImg,
    RequestTerminationImg,
    RequestValidatorImg,
    ResponseRateLimitingImg,
    RouteByHeaderImg,
    UpstreamTimeoutImg,
    WebSocketSizeLimitImg,
    WebSocketValidatorImg,
    XmlThreatProtectionImg,
    AwsLambdaImg,
    OpenWhiskImg,
    AzureFunctionsImg,
    PosFunctionImg,
    PreFunctionImg,
    AppDynamicsImg,
    DatadogImg,
    OpenTelemetryImg,
    PrometheusImg,
    StatsDImg,
    StatsDAdvancedImg,
    ZipkinImg,
    CorrelationIdImg,
    DeGraphQLImg,
    ExitTransformerImg,
    KafkaUpstreamImg,
    RequestTransformerImg,
    RequestTransformerAdvancedImg,
    ResponseTransformerImg,
    ResponseTransformerAdvancedImg,
    RouteTransformerAdvancedImg,
    GrpcWebImg,
    GrpcGatewayImg,
    JqImg,
    FileLogImg,
    HttpLogImg,
    KafkaLogImg,
    LogglyImg,
    SyslogImg,
    TcpLogImg,
    UdpLogImg,
} from './images'


    export const PluginsInfoData = 
      {
        plugins: [
          {
            category: "AI",
            name: "AI Proxy",
            slug: "ai-proxy",
            description: "Call supported Large Language Model vendors and models through Kong Gateway, using mediated data formats and authentication",
            tags: ["OSS"],
            image: AiProxyImg
          },
          {
            category: "AI",
            name: "AI Prompt Decorator",
            slug: "ai-prompt-decorator",
            description: "Prepend or append an array of llm/v1/chat messages to a user's chat history",
            tags: ["OSS"],
            image: AiPromptDecoratorImg
          },
          {
            category: "AI",
            name: "AI Prompt Guard",
            slug: "ai-prompt-guard",
            description: "Check llm/v1/chat or llm/v1/completions requests against a list of allowed or denied expressions",
            tags: ["OSS"],
            image: AiPromptGuardImg
          },
          {
            category: "AI",
            name: "AI Prompt Template",
            slug: "ai-prompt-template",
            description: "Provide fill-in-the-blank AI prompts to users",
            tags: ["OSS"],
            image: AiPromptTemplateImg
          },
          {
            category: "AI",
            name: "AI Request Transformer",
            slug: "ai-request-transformer",
            description: "Use an LLM service to inspect and transform the client's request body prior to proxying the request to the upstream server",
            tags: ["OSS"],
            image: AiRequestTransformerImg
          },
          {
            category: "AI",
            name: "AI Response Transformer",
            slug: "ai-response-transformer",
            description: "Use an LLM service to examine the upstream HTTP(S) prior to forwarding it to the client",
            tags: ["OSS"],
            image: AiResponseTransformerImg
          },
          {
            category: "Authentication",
            name: "Basic Authentication",
            slug: "basic-auth",
            description: "Add Basic Authentication to your services",
            tags: ["OSS"],
            image: BasicAuthImg
          },
          {
            category: "Authentication",
            name: "HMAC Auth",
            slug: "hmac-auth",
            description: "Add HMAC Authentication to your services",
            tags: ["OSS"],
            image: HmacAuthImg
          },
          {
            category: "Authentication",
            name: "JWE Decrypt",
            slug: "jwe-decrypt",
            description: "Decrypt a JWE token in a request",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: JweDecryptImg
          },
          {
            category: "Authentication",
            name: "JWT",
            slug: "jwt",
            description: "Verify and authenticate JSON Web Tokens",
            tags: ["OSS"],
            image: JwtImg
          },
          {
            category: "Authentication",
            name: "Key Auth",
            slug: "key-auth",
            description: "Add key authentication to your Services",
            tags: ["OSS"],
            image: KeyAuthImg
          },
          {
            category: "Authentication",
            name: "Key Authentication - Encrypted",
            slug: "key-auth-enc",
            description: "Add key authentication to your services",
            tags: ["ENTERPRISE"],
            image: KeyAuthEncImg
          },
          {
            category: "Authentication",
            name: "Kong JWT Signer",
            slug: "jwt-signer",
            description: "Verify and sign one or two tokens in a request",
            tags: ["ENTERPRISE"],
            image: JwtSignerImg
          },
          {
            category: "Authentication",
            name: "LDAP Authentication",
            slug: "ldap-auth",
            description: "Integrate Kong with an LDAP server",
            tags: ["OSS"],
            image: LdapAuthImg
          },
          {
            category: "Authentication",
            name: "LDAP Authentication Advanced",
            slug: "ldap-auth-advanced",
            description: "Secure Kong with username and password protection, use LDAP search and service directory mapping",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: LdapAuthAdvancedImg
          },
          {
            category: "Authentication",
            name: "Mutual TLS Authentication",
            slug: "mtls-auth",
            description: "Secure routes and services with client certificate and mutual TLS authentication",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: MtlsAuthImg
          },
          {
            category: "Authentication",
            name: "OAuth 2.0 Authentication",
            slug: "oauth2",
            description: "Add OAuth 2.0 authentication to your service",
            tags: ["OSS"],
            image: Oauth2Img
          },
          {
            category: "Authentication",
            name: "OAuth 2.0 Introspection",
            slug: "oauth2-introspection",
            description: "Integrate Kong with a third-party OAuth 2.0 Authorization Server",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: Oauth2IntrospectionImg
          },
          {
            category: "Authentication",
            name: "OpenID Connect",
            slug: "openid-connect",
            description: "Integrate Kong with a third-party OpenID Connect provider",
            tags: ["KONNECT PREMIUM", "ENTERPRISE"],
            image: OpenidConnectImg
          },
          {
            category: "Authentication",
            name: "Portal Application Registration",
            slug: "application-registration",
            description: "Allow portal developers to register applications against services",
            tags: ["ENTERPRISE"],
            image: AppRegistrationImg
          },
          {
            category: "Authentication",
            name: "SAML",
            slug: "saml",
            description: "Provides SAML v2.0 authentication and authorization between a service provider (Kong) and an identity provider (IdP)",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: SamlImg
          },
          {
            category: "Authentication",
            name: "Session",
            slug: "session",
            description: "Support sessions for Kong authentication plugins.",
            tags: ["OSS"],
            image: SessionImg
          },
          {
            category: "Authentication",
            name: "Vault Authentication",
            slug: "vault-auth",
            description: "Add Vault authentication to your services",
            tags: ["ENTERPRISE"],
            image: VaultAuthImg
          },
          {
            category: "Authentication",
            name: "Okta",
            slug: "okta",
            description: "Integrate Okta's API Access Management (OAuth as a Service) with Kong API Gateway",
            tags: ["ENTERPRISE", "TECH PARTNER"],
            image: OktaImg
          },
          {
            category: "Security",
            name: "ACME",
            slug: "acme",
            description: "Let's Encrypt and ACMEv2 integration with Kong Gateway",
            tags: ["OSS"],
            image: AcmeImg
          },
          {
            category: "Security",
            name: "Bot Detection",
            slug: "bot-detection",
            description: "Detect and block bots or custom clients",
            tags: ["OSS"],
            image: BotDetectionImg
          },
          {
            category: "Security",
            name: "CORS",
            slug: "cors",
            description: "Allow developers to make requests from the browser",
            tags: ["OSS"],
            image: CorsImg
          },
          {
            category: "Security",
            name: "IP Restriction",
            slug: "ip-restriction",
            description: "Allow or deny IPs that can make requests to your services",
            tags: ["OSS"],
            image: IpRestrictionImg
          },
          {
            category: "Security",
            name: "OPA",
            slug: "opa",
            description: "Authorize requests against Open Policy Agent",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: OpaImg
          },
          {
            category: "Security",
            name: "TLS Handshake Modifier",
            slug: "tls-handshake-modifier",
            description: "Requests a client to present its client certificate",
            tags: ["ENTERPRISE"],
            image: TlsHandshakeModifierImg
          },
          {
            category: "Security",
            name: "TLS Metadata Headers",
            slug: "tls-metadata-headers",
            description: "Proxies TLS client certificate metadata to upstream services via HTTP headers",
            tags: ["ENTERPRISE"],
            image: TlsMetadataHeadersImg
          },
          {
            category: "Security",
            name: "Imperva API Security",
            slug: "imp-appsec-connector",
            description: "Integrate Kong Gateway with Imperva API Security to discover, monitor, and protect APIs",
            tags: ["ENTERPRISE", "TECH PARTNER"],
            image: ImpervaApiSecurityImg
          },
          {
            category: "Traffic Control",
            name: "ACL",
            slug: "acl",
            description: "Control which consumers can access services",
            tags: ["OSS"],
            image: AclImg
          },
          {
            category: "Traffic Control",
            name: "Canary Release",
            slug: "canary",
            description: "Slowly roll out software changes to a subset of users",
            tags: ["KONNECT PREMIUM", "ENTERPRISE"],
            image: CanaryImg
          },
          {
            category: "Traffic Control",
            name: "Forward Proxy Advanced",
            slug: "forward-proxy",
            description: "Allows Kong to connect to intermediary transparent HTTP proxies",
            tags: ["KONNECT PREMIUM", "ENTERPRISE"],
            image: ForwardProxyImg
          },
          {
            category: "Traffic Control",
            name: "GraphQL Proxy Caching Advanced",
            slug: "graphql-proxy-cache-advanced",
            description: "Cache and serve commonly requested responses in Kong",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: GraphQLProxyCacheAdvancedImg
          },
          {
            category: "Traffic Control",
            name: "GraphQL Rate Limiting Advanced",
            slug: "graphql-rate-limiting-advanced",
            description: "Provide rate limiting for GraphQL queries",
            tags: ["KONNECT PREMIUM", "ENTERPRISE"],
            image: GraphQLRateLimitingAdvancedImg
          },
          {
            category: "Traffic Control",
            name: "Mocking",
            slug: "mocking",
            description: "Provide mock endpoints to test your APIs against your services",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: MockingImg
          },
          {
            category: "Traffic Control",
            name: "OAS Validation",
            slug: "oas-validation",
            description: "Validate HTTP requests and responses based on an OpenAPI 3.0 or Swagger API Specification",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: OasValidationImg
          },
          {
            category: "Traffic Control",
            name: "Proxy Cache",
            slug: "proxy-cache",
            description: "Cache and serve commonly requested responses in Kong",
            tags: ["OSS"],
            image: ProxyCacheImg
          },
          {
            category: "Traffic Control",
            name: "Proxy Caching Advanced",
            slug: "proxy-cache-advanced",
            description: "Cache and serve commonly requested responses in Kong",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: ProxyCacheAdvancedImg
          },
          {
            category: "Traffic Control",
            name: "Rate Limiting",
            slug: "rate-limiting",
            description: "Rate limit how many HTTP requests can be made in a period of time",
            tags: ["OSS"],
            image: RateLimitingImg
          },
          {
            category: "Traffic Control",
            name: "Rate Limiting Advanced",
            slug: "rate-limiting-advanced",
            description: "Upgrades Kong Rate Limiting with more flexibility and higher performance",
            tags: ["KONNECT PREMIUM", "ENTERPRISE"],
            image: RateLimitingAdvancedImg
          },
          {
            category: "Traffic Control",
            name: "Request Size Limiting",
            slug: "request-size-limiting",
            description: "Block requests with bodies greater than a specified size",
            tags: ["OSS"],
            image: RequestSizeLimitingImg
          },
          {
            category: "Traffic Control",
            name: "Request Termination",
            slug: "request-termination",
            description: "Terminates all requests with a specific response",
            tags: ["OSS"],
            image: RequestTerminationImg
          },
          {
            category: "Traffic Control",
            name: "Request Validator",
            slug: "request-validator",
            description: "Validates requests before they reach the upstream service",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: RequestValidatorImg
          },
          {
            category: "Traffic Control",
            name: "Response Rate Limiting",
            slug: "response-ratelimiting",
            description: "Rate limit based on a custom response header value",
            tags: ["OSS"],
            image: ResponseRateLimitingImg
          },
          {
            category: "Traffic Control",
            name: "Route By Header",
            slug: "route-by-header",
            description: "Route request based on request headers",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: RouteByHeaderImg
          },
          {
            category: "Traffic Control",
            name: "Upstream Timeout",
            slug: "upstream-timeout",
            description: "Set timeouts on routes and override service-level timeouts",
            tags: ["KONNECT PREMIUM", "ENTERPRISE"],
            image: UpstreamTimeoutImg
          },
          {
            category: "Traffic Control",
            name: "WebSocket Size Limit",
            slug: "websocket-size-limit",
            description: "Block incoming WebSocket messages greater than a specified size",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: WebSocketSizeLimitImg
          },
          {
            category: "Traffic Control",
            name: "WebSocket Validator",
            slug: "websocket-validator",
            description: "Validate WebSocket messages before they are proxied",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: WebSocketValidatorImg
          },
          {
            category: "Traffic Control",
            name: "XML Threat Protection",
            slug: "xml-threat-protection",
            description: "Apply structural and size checks on XML payloads",
            tags: ["KONNECT PREMIUM", "ENTERPRISE"],
            image: XmlThreatProtectionImg
          },
          {
            category: "Serverless",
            name: "AWS Lambda",
            slug: "aws-lambda",
            description: "Invoke and manage AWS Lambda functions from Kong",
            tags: ["OSS"],
            image: AwsLambdaImg
          },
          {
            category: "Serverless",
            name: "Apache OpenWhisk",
            slug: "openwhisk",
            description: "Invoke and manage OpenWhisk actions from Kong",
            tags: ["OSS"],
            image: OpenWhiskImg
          },
          {
            category: "Serverless",
            name: "Azure Functions",
            slug: "azure-functions",
            description: "Invoke and manage Azure functions from Kong",
            tags: ["OSS"],
            image: AzureFunctionsImg
          },
          {
            category: "Serverless",
            name: "Kong Functions (Post-Plugin)",
            slug: "pos-function",
            description: "Add and manage custom Lua functions to run after other plugins",
            tags: ["OSS"],
            image: PosFunctionImg
          },
          {
            category: "Serverless",
            name: "Kong Functions (Pre-Plugins)",
            slug: "pre-function",
            description: "Add and manage custom Lua functions to run before other plugins",
            tags: ["OSS"],
            image: PreFunctionImg
          },
          {
            category: "Analitics & Monitoring",
            name: "AppDynamics",
            slug: "app-dynamics",
            description: "Integrate Kong with the AppDynamics APM Platform",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: AppDynamicsImg
          },
          {
            category: "Analitics & Monitoring",
            name: "Datadog",
            slug: "datadog",
            description: "Visualize metrics on Datadog",
            tags: ["OSS"],
            image: DatadogImg
          },
          {
            category: "Analitics & Monitoring",
            name: "OpenTelemetry",
            slug: "opentelemetry",
            description: "Propagate spans and report space to a backend server through OTLP protocol",
            tags: ["OSS"],
            image: OpenTelemetryImg
          },
          {
            category: "Analitics & Monitoring",
            name: "Prometheus",
            slug: "prometheus",
            description: "Expose metrics related to Kong and proxied upstream services in Prometheus exposition format",
            tags: [""],
            image: PrometheusImg
          },
          {
            category: "Analitics & Monitoring",
            name: "StatsD",
            slug: "statsd",
            description: "Send metrics to StatsD",
            tags: [""],
            image: StatsDImg
          },
          {
            category: "Analitics & Monitoring",
            name: "StatsD Advanced",
            slug: "statsd-advanced",
            description: "(Deprecated) Send metrics to StatsD with more flexible options",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: StatsDAdvancedImg
          },
          {
            category: "Analitics & Monitoring",
            name: "Zipkin",
            slug: "zipkin",
            description: "Propagate Zipkin spans and report space to a Zipkin server",
            tags: ["OSS"],
            image: ZipkinImg
          },
          {
            category: "Transformations",
            name: "Correlation ID",
            slug: "correlation-id",
            description: "Correlate requests and responses using a unique ID",
            tags: ["OSS"],
            image: CorrelationIdImg
          },
          {
            category: "Transformations",
            name: "DeGraphQL",
            slug: "degraphql",
            description: "Transform a GraphQL upstream into a REST API",
            tags: ["KONNECT PREMIUM", "ENTERPRISE"],
            image: DeGraphQLImg
          },
          {
            category: "Transformations",
            name: "Exit Transformer",
            slug: "exit-transformer",
            description: "Customize Kong exit responses sent downstream",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: ExitTransformerImg
          },
          {
            category: "Transformations",
            name: "Kafka Upstream",
            slug: "krafka-upstream",
            description: "Transform requests into Kafka messages in a Kafka topic",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: KafkaUpstreamImg
          },
          {
            category: "Transformations",
            name: "Request Transformer",
            slug: "request-transformer",
            description: "Use regular expressions, variables, and templates to transform requests",
            tags: ["OSS"],
            image: RequestTransformerImg
          },
          {
            category: "Transformations",
            name: "Request Transformer Advanced",
            slug: "request-transformer-advanced",
            description: "Use powerful regular expressions, variables, and templates to transform API requests",
            tags: ["KONNECT PREMIUM", "ENTERPRISE"],
            image: RequestTransformerAdvancedImg
          },
          {
            category: "Transformations",
            name: "Response Transformer",
            slug: "response-transformer",
            description: "Modify the upstream response before returning it to the client",
            tags: ["OSS"],
            image: ResponseTransformerImg
          },
          {
            category: "Transformations",
            name: "Response Transformer Advanced",
            slug: "response-transformer-advanced",
            description: "Modify the upstream response before returning it to the client, with greater customization capabilities",
            tags: ["KONNECT PREMIUM", "ENTERPRISE"],
            image: ResponseTransformerAdvancedImg
          },
          {
            category: "Transformations",
            name: "Route Transformer Advanced",
            slug: "route-transformer-advanced",
            description: "Transform routing by changing the upstream server, port, or path",
            tags: ["KONNECT PREMIUM", "ENTERPRISE"],
            image: RouteTransformerAdvancedImg
          },
          {
            category: "Transformations",
            name: "gRPC-Web",
            slug: "grpc-web",
            description: "Allow browser clients to call gRPC services",
            tags: ["OSS"],
            image: GrpcWebImg
          },
          {
            category: "Transformations",
            name: "gRPC-gateway",
            slug: "grpc-gateway",
            description: "Access gRPC services through HTTP REST",
            tags: ["OSS"],
            image: GrpcGatewayImg
          },
          {
            category: "Transformations",
            name: "Jq",
            slug: "jq",
            description: "Transform JSON objects included in API requests or responses using jq programs",
            tags: ["KONNECT PREMIUM", "ENTERPRISE"],
            image: JqImg
          },
          {
            category: "Logging",
            name: "File Log",
            slug: "file-log",
            description: "Append request and response data to a log file",
            tags: ["OSS"],
            image: FileLogImg
          },
          {
            category: "Logging",
            name: "HTTP Log",
            slug: "http-log",
            description: "Send request and response logs to an HTTP server",
            tags: ["OSS"],
            image: HttpLogImg
          },
          {
            category: "Logging",
            name: "Kafka Log",
            slug: "krafka-log",
            description: "Publish logs to a Kafka topic",
            tags: ["KONNECT PAID", "ENTERPRISE"],
            image: KafkaLogImg
          },
          {
            category: "Logging",
            name: "Loggly",
            slug: "loggly",
            description: "Send request and response logs to Loggly",
            tags: ["OSS"],
            image: LogglyImg
          },
          {
            category: "Logging",
            name: "Syslog",
            slug: "syslog",
            description: "Send request and response logs to Syslog",
            tags: ["OSS"],
            image: SyslogImg
          },
          {
            category: "Logging",
            name: "TCP Log",
            slug: "tcp-log",
            description: "Send request and response logs to a TCP server",
            tags: ["OSS"],
            image: TcpLogImg
          },
          {
            category: "Logging",
            name: "UDP Log",
            slug: "udp-log",
            description: "Send request and response logs to a UDP server",
            tags: ["OSS"],
            image: UdpLogImg
          }

        ]
      }