<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250729222036 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE interventions DROP CONSTRAINT FK_5ADBAD7F8799C512
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE interventions ADD CONSTRAINT FK_5ADBAD7F8799C512 FOREIGN KEY (client_bike_id) REFERENCES bikes (id) ON DELETE SET NULL NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE interventions DROP CONSTRAINT fk_5adbad7f8799c512
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE interventions ADD CONSTRAINT fk_5adbad7f8799c512 FOREIGN KEY (client_bike_id) REFERENCES bikes (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
    }
}
