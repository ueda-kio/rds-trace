-- CIで発生する「ConnectionCallback; FATAL: 現在クライアント数が多すぎます」対策
ALTER SYSTEM SET max_connections = 250;
