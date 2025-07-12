<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250712155601 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Convert users.id from integer to UUID';
    }

    public function up(Schema $schema): void
    {
        // Step 1: Add a temporary UUID column
        $this->addSql('ALTER TABLE users ADD COLUMN id_temp UUID');

        // Step 2: Generate UUIDs for existing records
        $this->addSql('UPDATE users SET id_temp = gen_random_uuid()');

        // Step 3: Drop the old sequence
        $this->addSql('DROP SEQUENCE IF EXISTS users_id_seq CASCADE');

        // Step 4: Drop the old id column and rename the temp column
        $this->addSql('ALTER TABLE users DROP COLUMN id');
        $this->addSql('ALTER TABLE users RENAME COLUMN id_temp TO id');

        // Step 5: Add NOT NULL constraint and make it primary key
        $this->addSql('ALTER TABLE users ALTER COLUMN id SET NOT NULL');
        $this->addSql('ALTER TABLE users ADD PRIMARY KEY (id)');

        // Step 6: Add Doctrine comment
        $this->addSql('COMMENT ON COLUMN users.id IS \'(DC2Type:uuid)\'');
    }

    public function down(Schema $schema): void
    {
        // WARNING: This will lose data as we cannot convert UUIDs back to sequential integers
        $this->addSql('CREATE SEQUENCE users_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('ALTER TABLE users DROP CONSTRAINT users_pkey');
        $this->addSql('ALTER TABLE users ALTER id TYPE INT USING 1'); // This will set all IDs to 1
        $this->addSql('ALTER TABLE users ALTER id SET DEFAULT nextval(\'users_id_seq\')');
        $this->addSql('COMMENT ON COLUMN users.id IS NULL');
        $this->addSql('ALTER TABLE users ADD PRIMARY KEY (id)');
    }
}
