import { QueryResult } from "pg";
import pool from '../config/dbConfigTest';

export const addDescription = async (description_id: string, description: string, user_id: string) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const timestamp = new Date().toISOString();
    const insertCommentQuery = `INSERT INTO descriptions (description_id, description, user_id, date_time) VALUES ($1,$2,$3,$4) RETURNING *`;
    const insertCommentResult: QueryResult = await client.query(insertCommentQuery, [description_id, description, user_id, timestamp]);
    await client.query("COMMIT");
    return insertCommentResult.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
export const getDescriptionQuery = async (task_id: string) => {
  try {
    const client = await pool.connect();
    const getDescriptionResult = await client.query({
      text: 'SELECT description, date_time, name  FROM descriptions, users WHERE task_id = $1 and descriptions.user_id = users.user_id;',
      values: [task_id],
    });
    client.release();
    return getDescriptionResult.rows[0];
  } catch (error) {
    throw error;
  }
};
