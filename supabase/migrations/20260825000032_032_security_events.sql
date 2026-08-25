-- Migration 032: Security Events Domain
CREATE TABLE security_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
    event_type VARCHAR(50) NOT NULL, -- e.g. ACCESS_DENIED, SUSPICIOUS_QR_SCAN, RATE_LIMIT_EXCEEDED
    severity VARCHAR(20) NOT NULL DEFAULT 'WARNING' CHECK (severity IN ('INFO', 'WARNING', 'CRITICAL')),
    ip_address INET,
    details TEXT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
