import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'openai_oauth_token', schema: 'core' })
@Index('IDX_openai_oauth_token_workspaceId', ['workspaceId'])
export class OpenaiOauthTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  workspaceId: string;

  // The workspace member who connected their ChatGPT account.
  // When null the token is workspace-wide (admin-provisioned).
  @Column({ type: 'uuid', nullable: true })
  userId: string | null;

  // Encrypted with the workspace ENCRYPTION_KEY
  @Column({ type: 'text' })
  accessToken: string;

  // Encrypted with the workspace ENCRYPTION_KEY
  @Column({ type: 'text', nullable: true })
  refreshToken: string | null;

  @Column({ type: 'timestamptz' })
  expiresAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  accountEmail: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
