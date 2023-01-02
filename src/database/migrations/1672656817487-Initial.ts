import {MigrationInterface, QueryRunner} from 'typeorm'

export class Initial1672656817487 implements MigrationInterface {
  name = 'Initial1672656817487'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "exercise"
      (
        "uuid"            varchar PRIMARY KEY NOT NULL,
        "name"            varchar             NOT NULL,
        "description"     text,
        "has_repetitions" boolean             NOT NULL DEFAULT (0),
        "has_weight"      boolean             NOT NULL DEFAULT (0),
        "has_time"        boolean             NOT NULL DEFAULT (0),
        "has_distance"    boolean             NOT NULL DEFAULT (0),
        "muscle"          varchar             NOT NULL,
        "is_cardio"       boolean             NOT NULL DEFAULT (0),
        "is_machine"      boolean             NOT NULL DEFAULT (0),
        "is_dumbbell"     boolean             NOT NULL DEFAULT (0),
        "is_barbell"      boolean             NOT NULL DEFAULT (0),
        "created_at"      datetime            NOT NULL DEFAULT (datetime('now')),
        "updated_at"      datetime            NOT NULL DEFAULT (datetime('now')),
        CONSTRAINT "UQ_4420597915e901ab5d6f2bcaee4" UNIQUE ("name")
      )
`)
    await queryRunner.query(`
      CREATE TABLE "workout_set"
      (
        "uuid"          varchar PRIMARY KEY NOT NULL,
        "repetitions"   integer,
        "weight"        real,
        "time"          varchar,
        "distance"      real,
        "notes"         text,
        "executed_at"   datetime            NOT NULL,
        "exercise_uuid" varchar             NOT NULL,
        "created_at"    datetime            NOT NULL DEFAULT (datetime('now')),
        "updated_at"    datetime            NOT NULL DEFAULT (datetime('now')),
        CONSTRAINT "CHK_56e264b8647de6af4800c12199" CHECK (distance >= 0),
        CONSTRAINT "CHK_3985c52087df0028ae4052c46b" CHECK (time IS strftime('%H:%M:%S', time)),
        CONSTRAINT "CHK_5737aa4105950891f4d3d02420" CHECK (weight >= 0),
        CONSTRAINT "CHK_170c38bdf000d19b341b5f9803" CHECK (repetitions > 0),
        CONSTRAINT "FK_7b4c44383ee43083d3d4ce2d962" FOREIGN KEY ("exercise_uuid") REFERENCES "exercise" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION
      )
`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "workout_set"`)
    await queryRunner.query(`DROP TABLE "exercise"`)
  }
}
