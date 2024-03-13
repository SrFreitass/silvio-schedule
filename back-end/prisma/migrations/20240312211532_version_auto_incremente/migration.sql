-- AlterTable
CREATE SEQUENCE schedule_version_seq;
ALTER TABLE "schedule" ALTER COLUMN "version" SET DEFAULT nextval('schedule_version_seq');
ALTER SEQUENCE schedule_version_seq OWNED BY "schedule"."version";
