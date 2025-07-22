<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250722211116 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE bicycles (id SERIAL NOT NULL, owner_id UUID NOT NULL, name VARCHAR(120) NOT NULL, size VARCHAR(3) NOT NULL, type VARCHAR(50) NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_2AB85B1E7E3C61F9 ON bicycles (owner_id)
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN bicycles.owner_id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE brands (id SERIAL NOT NULL, name VARCHAR(120) NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE interventions (id SERIAL NOT NULL, client_id UUID NOT NULL, technician_id UUID DEFAULT NULL, type_intervention_id INT DEFAULT NULL, start_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, end_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, comment TEXT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_5ADBAD7F19EB6921 ON interventions (client_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_5ADBAD7FE6C5D496 ON interventions (technician_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_5ADBAD7F799AAC17 ON interventions (type_intervention_id)
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN interventions.client_id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN interventions.technician_id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE models (id SERIAL NOT NULL, name VARCHAR(120) NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE products (id SERIAL NOT NULL, name VARCHAR(255) NOT NULL, price DOUBLE PRECISION NOT NULL, description TEXT DEFAULT NULL, category VARCHAR(140) NOT NULL, img BYTEA DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE type_intervention (id SERIAL NOT NULL, name VARCHAR(120) NOT NULL, price DOUBLE PRECISION NOT NULL, duration TIME(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE users (id UUID NOT NULL, technician_zone_id INT DEFAULT NULL, client_zone_id INT DEFAULT NULL, email VARCHAR(50) NOT NULL, roles VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, firstname VARCHAR(50) NOT NULL, lastname VARCHAR(50) NOT NULL, number VARCHAR(20) NOT NULL, address JSON NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE UNIQUE INDEX UNIQ_1483A5E92119AF0D ON users (technician_zone_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_1483A5E9CD117BD6 ON users (client_zone_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL ON users (email)
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN users.id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE zone (id SERIAL NOT NULL, name VARCHAR(150) NOT NULL, coords JSON NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE bicycles ADD CONSTRAINT FK_2AB85B1E7E3C61F9 FOREIGN KEY (owner_id) REFERENCES users (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE interventions ADD CONSTRAINT FK_5ADBAD7F19EB6921 FOREIGN KEY (client_id) REFERENCES users (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE interventions ADD CONSTRAINT FK_5ADBAD7FE6C5D496 FOREIGN KEY (technician_id) REFERENCES users (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE interventions ADD CONSTRAINT FK_5ADBAD7F799AAC17 FOREIGN KEY (type_intervention_id) REFERENCES type_intervention (id) ON DELETE SET NULL NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE users ADD CONSTRAINT FK_1483A5E92119AF0D FOREIGN KEY (technician_zone_id) REFERENCES zone (id) ON DELETE SET NULL NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE users ADD CONSTRAINT FK_1483A5E9CD117BD6 FOREIGN KEY (client_zone_id) REFERENCES zone (id) ON DELETE SET NULL NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE bicycles DROP CONSTRAINT FK_2AB85B1E7E3C61F9
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE interventions DROP CONSTRAINT FK_5ADBAD7F19EB6921
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE interventions DROP CONSTRAINT FK_5ADBAD7FE6C5D496
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE interventions DROP CONSTRAINT FK_5ADBAD7F799AAC17
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE users DROP CONSTRAINT FK_1483A5E92119AF0D
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE users DROP CONSTRAINT FK_1483A5E9CD117BD6
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE bicycles
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE brands
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE interventions
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE models
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE products
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE type_intervention
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE users
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE zone
        SQL);
    }
}
