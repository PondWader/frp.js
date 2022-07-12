type ServerCommonConf = {
    bind_addr?: string;
    bind_port?: number;
    bind_udp_port?: number;
    kcp_bind_port?: number;
    proxy_bind_addr?: string;
    vhost_http_port?: number;
    vhost_https_port?: number;
    vhost_http_timeout?: number;
    tcpmux_httpconnect_port?: number;
    tcpmux_passthrough?: boolean;
    dashboard_addr?: string;
    dashboard_port?: number;
    dashboard_user?: string;
    dashboard_pwd?: string;
    dashboard_tls_mode?: boolean;
    dashboard_tls_cert_file?: string;
    dashboard_tls_key_file?: string;
    enable_prometheus?: boolean;
    assets_dir?: string;
    log_file?: string;
    log_level?: 'trace' | 'debug' | 'info' | 'warn' | 'error';
    log_max_days?: number;
    disable_log_color?: boolean;
    detailed_errors_to_client?: boolean;
    authentication_method?: 'token' | 'oidc';
    authenticate_heartbeats?: boolean;
    authenticate_new_work_conns?: boolean;
    token?: string;
    oidc_issuer?: string;
    oidc_audience?: string;
    oidc_skip_expiry_check?: boolean;
    oidc_skip_issuer_check?: boolean;
    heartbeat_timeout?: number;
    user_conn_timeout?: number;
    allow_ports?: string;
    max_pool_count?: number;
    max_ports_per_client?: number;
    tls_only?: boolean;
    tls_cert_file?: string;
    tls_key_file?: string;
    tls_trusted_ca_file?: string;
    subdomain_host?: string;
    tcp_mux?: boolean;
    tcp_mux_keepalive_interval?: number;
    tcp_keepalive?: number;
    custom_404_page?: string;
    udp_packet_size?: number;
    pprof_enable?: boolean;
    [key: string]: any;
}

type ServerPluginConf = {
    addr?: string;
    path?: string;
    ops?: string;
    [key: string]: any;
}

export type ServerConf = {
    common: ServerCommonConf;
    [key: `plugin.${string}`]: ServerPluginConf;
}