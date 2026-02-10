CREATE ROLE realpha
WITH
    LOGIN CREATEDB;

CREATE DATABASE clarity OWNER realpha;

ALTER ROLE realpha
WITH
    password '<set_a_password>'