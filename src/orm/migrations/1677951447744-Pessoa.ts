import {MigrationInterface, QueryRunner} from "typeorm";

export class Pessoa1677951447744 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "pessoa" ("id" SERIAL NOT NULL, "nome" character varying(255), "sobrenome" character varying(250), "telefone" character varying(100) NOT NULL, "email" character varying NOT NULL, "rua" character varying(50), "bairro" character varying(15) NOT NULL,"numero" character varying(250),"complemento" character varying(250), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be4" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7434" PRIMARY KEY ("id"))`,
            undefined,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pessoa"`, undefined);
    }

}
