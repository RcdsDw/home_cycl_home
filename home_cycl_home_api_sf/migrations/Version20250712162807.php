<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20250712160000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Réorganise les colonnes de la table users avec id en premier';
    }

    public function up(Schema $schema): void
    {
        // Étape 1: Créer une nouvelle table avec le bon ordre des colonnes
        $this->addSql('CREATE TABLE users_new (
            id UUID PRIMARY KEY,
            email VARCHAR(50) NOT NULL,
            roles JSON NOT NULL,
            password VARCHAR(255) NOT NULL,
            firstname VARCHAR(50) NOT NULL,
            lastname VARCHAR(50) NOT NULL,
            number VARCHAR(20) NOT NULL,
            address JSON NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )');

        // Étape 2: Copier les données avec vos vraies colonnes
        $this->addSql('INSERT INTO users_new (
            id, email, roles, password, firstname, lastname, number, address, created_at, updated_at
        ) SELECT 
            id, email, roles, password, firstname, lastname, number, address, created_at, updated_at 
        FROM users');

        // Étape 3: Supprimer l'ancienne table
        $this->addSql('DROP TABLE users');

        // Étape 4: Renommer la nouvelle table
        $this->addSql('ALTER TABLE users_new RENAME TO users');

        // Étape 5: Recréer les contraintes et index
        $this->addSql('CREATE UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL ON users (email)');
        $this->addSql('COMMENT ON COLUMN users.id IS \'(DC2Type:uuid)\'');
    }

    public function down(Schema $schema): void
    {
        // Rollback : remettre les colonnes dans l'ordre précédent (avec id à la fin)
        $this->addSql('CREATE TABLE users_old (
            email VARCHAR(50) NOT NULL,
            roles JSON NOT NULL,
            password VARCHAR(255) NOT NULL,
            firstname VARCHAR(50) NOT NULL,
            lastname VARCHAR(50) NOT NULL,
            number VARCHAR(20) NOT NULL,
            address JSON NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            id UUID PRIMARY KEY
        )');

        $this->addSql('INSERT INTO users_old (
            email, roles, password, firstname, lastname, number, address, created_at, updated_at, id
        ) SELECT 
            email, roles, password, firstname, lastname, number, address, created_at, updated_at, id 
        FROM users');

        $this->addSql('DROP TABLE users');
        $this->addSql('ALTER TABLE users_old RENAME TO users');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL ON users (email)');
        $this->addSql('COMMENT ON COLUMN users.id IS \'(DC2Type:uuid)\'');
    }
}
