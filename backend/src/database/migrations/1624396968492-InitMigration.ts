import {MigrationInterface, QueryRunner} from 'typeorm'

export class InitMigration1624396968492 implements MigrationInterface {
  name = 'InitMigration1624396968492'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("uuid" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`
    )
    await queryRunner.query(
      `CREATE TABLE "exercise" ("uuid" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" text, "hasRepetitions" boolean NOT NULL DEFAULT (0), "hasWeight" boolean NOT NULL DEFAULT (0), "hasTime" boolean NOT NULL DEFAULT (0), "hasDistance" boolean NOT NULL DEFAULT (0), "muscle" varchar NOT NULL, "isCardio" boolean NOT NULL DEFAULT (0), "isMachine" boolean NOT NULL DEFAULT (0), "isDumbbell" boolean NOT NULL DEFAULT (0), "isBarbell" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "userUuid" varchar NOT NULL, CONSTRAINT "UQ_4420597915e901ab5d6f2bcaee4" UNIQUE ("name"), CONSTRAINT "FK_d20f00d3eabbfb7ff5f49b52e6b" FOREIGN KEY ("userUuid") REFERENCES "user" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    )
    await queryRunner.query(
      `CREATE TABLE "workout_set" ("uuid" varchar PRIMARY KEY NOT NULL, "repetitions" integer, "weight" integer, "time" varchar, "distance" integer, "notes" varchar, "executedAt" datetime NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "exerciseUuid" varchar NOT NULL, "userUuid" varchar NOT NULL, CONSTRAINT "FK_17ec7b6063fd05e55ec90554530" FOREIGN KEY ("exerciseUuid") REFERENCES "exercise" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_14877facf6d67175f772588959b" FOREIGN KEY ("userUuid") REFERENCES "user" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "workout_set"`)
    await queryRunner.query(`DROP TABLE "exercise"`)
    await queryRunner.query(`DROP TABLE "user"`)
  }
}
