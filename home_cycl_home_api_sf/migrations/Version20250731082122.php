<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250731082122 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE bikes (id UUID NOT NULL, owner_id UUID NOT NULL, brand_id UUID NOT NULL, model_id UUID NOT NULL, name VARCHAR(120) NOT NULL, size VARCHAR(3) NOT NULL, type VARCHAR(50) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_F6FAF01C7E3C61F9 ON bikes (owner_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_F6FAF01C44F5D008 ON bikes (brand_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_F6FAF01C7975B7E7 ON bikes (model_id)
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN bikes.id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN bikes.owner_id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN bikes.brand_id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN bikes.model_id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE brands (id UUID NOT NULL, name VARCHAR(120) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN brands.id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE intervention_product (id UUID NOT NULL, intervention_id UUID NOT NULL, product_id UUID NOT NULL, quantity INT NOT NULL, product_price DOUBLE PRECISION NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_98A470C88EAE3863 ON intervention_product (intervention_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_98A470C84584665A ON intervention_product (product_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE UNIQUE INDEX intervention_product_constraint ON intervention_product (intervention_id, product_id)
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN intervention_product.id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN intervention_product.intervention_id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN intervention_product.product_id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE interventions (id UUID NOT NULL, client_bike_id UUID DEFAULT NULL, technician_id UUID DEFAULT NULL, type_intervention_id UUID DEFAULT NULL, start_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, end_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, comment TEXT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_5ADBAD7F8799C512 ON interventions (client_bike_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_5ADBAD7FE6C5D496 ON interventions (technician_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_5ADBAD7F799AAC17 ON interventions (type_intervention_id)
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN interventions.id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN interventions.client_bike_id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN interventions.technician_id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN interventions.type_intervention_id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE models (id UUID NOT NULL, brand_id UUID NOT NULL, name VARCHAR(120) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_E4D6300944F5D008 ON models (brand_id)
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN models.id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN models.brand_id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE products (id UUID NOT NULL, name VARCHAR(255) NOT NULL, price DOUBLE PRECISION NOT NULL, description TEXT DEFAULT NULL, category VARCHAR(140) NOT NULL, img BYTEA DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN products.id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE type_intervention (id UUID NOT NULL, name VARCHAR(120) NOT NULL, price DOUBLE PRECISION NOT NULL, duration INT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN type_intervention.id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE users (id UUID NOT NULL, technician_zone_id UUID DEFAULT NULL, client_zone_id UUID DEFAULT NULL, email VARCHAR(50) NOT NULL, roles VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, firstname VARCHAR(50) NOT NULL, lastname VARCHAR(50) NOT NULL, number VARCHAR(20) NOT NULL, address JSON NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))
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
            COMMENT ON COLUMN users.technician_zone_id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN users.client_zone_id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE zone (id UUID NOT NULL, name VARCHAR(150) NOT NULL, coords JSON NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN zone.id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE bikes ADD CONSTRAINT FK_F6FAF01C7E3C61F9 FOREIGN KEY (owner_id) REFERENCES users (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE bikes ADD CONSTRAINT FK_F6FAF01C44F5D008 FOREIGN KEY (brand_id) REFERENCES brands (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE bikes ADD CONSTRAINT FK_F6FAF01C7975B7E7 FOREIGN KEY (model_id) REFERENCES models (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product ADD CONSTRAINT FK_98A470C88EAE3863 FOREIGN KEY (intervention_id) REFERENCES interventions (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product ADD CONSTRAINT FK_98A470C84584665A FOREIGN KEY (product_id) REFERENCES products (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE interventions ADD CONSTRAINT FK_5ADBAD7F8799C512 FOREIGN KEY (client_bike_id) REFERENCES bikes (id) ON DELETE SET NULL NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE interventions ADD CONSTRAINT FK_5ADBAD7FE6C5D496 FOREIGN KEY (technician_id) REFERENCES users (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE interventions ADD CONSTRAINT FK_5ADBAD7F799AAC17 FOREIGN KEY (type_intervention_id) REFERENCES type_intervention (id) ON DELETE SET NULL NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE models ADD CONSTRAINT FK_E4D6300944F5D008 FOREIGN KEY (brand_id) REFERENCES brands (id) NOT DEFERRABLE INITIALLY IMMEDIATE
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
            ALTER TABLE bikes DROP CONSTRAINT FK_F6FAF01C7E3C61F9
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE bikes DROP CONSTRAINT FK_F6FAF01C44F5D008
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE bikes DROP CONSTRAINT FK_F6FAF01C7975B7E7
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product DROP CONSTRAINT FK_98A470C88EAE3863
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product DROP CONSTRAINT FK_98A470C84584665A
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE interventions DROP CONSTRAINT FK_5ADBAD7F8799C512
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE interventions DROP CONSTRAINT FK_5ADBAD7FE6C5D496
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE interventions DROP CONSTRAINT FK_5ADBAD7F799AAC17
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE models DROP CONSTRAINT FK_E4D6300944F5D008
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE users DROP CONSTRAINT FK_1483A5E92119AF0D
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE users DROP CONSTRAINT FK_1483A5E9CD117BD6
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE bikes
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE brands
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE intervention_product
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
