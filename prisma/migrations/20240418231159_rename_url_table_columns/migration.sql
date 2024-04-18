-- AlterTable
ALTER TABLE `url` RENAME COLUMN `longUrl` TO `long_url`,
    RENAME COLUMN `shortUrl` TO `short_url`,
    RENAME COLUMN `uniqueId` TO `unique_id`;
