exports.up = pgm => {
    // Extensions
    pgm.createExtension('uuid-ossp', { ifNotExists: true });
  
    // USERS
    pgm.createTable('users', {
      id: {
        type: 'uuid',
        primaryKey: true,
        default: pgm.func('uuid_generate_v4()'),
      },
      email: {
        type: 'text',
        notNull: true,
        unique: true,
      },
      password_hash: {
        type: 'text',
        notNull: true,
      },
      is_active: {
        type: 'boolean',
        default: true,
      },
      created_at: {
        type: 'timestamptz',
        default: pgm.func('now()'),
      },
    });
  
    // ARTISTS
    pgm.createTable('artists', {
      id: {
        type: 'uuid',
        primaryKey: true,
        default: pgm.func('uuid_generate_v4()'),
      },
      name: {
        type: 'text',
        notNull: true,
      },
      spotify_id: {
        type: 'text',
        unique: true,
      },
      youtube_channel_id: {
        type: 'text',
      },
      created_at: {
        type: 'timestamptz',
        default: pgm.func('now()'),
      },
    });
  
    // TRACKS
    pgm.createTable('tracks', {
      id: {
        type: 'uuid',
        primaryKey: true,
        default: pgm.func('uuid_generate_v4()'),
      },
      title: {
        type: 'text',
        notNull: true,
      },
      artist_id: {
        type: 'uuid',
        notNull: true,
        references: '"artists"',
        onDelete: 'cascade',
      },
      duration_seconds: {
        type: 'integer',
      },
      spotify_id: {
        type: 'text',
        unique: true,
      },
      created_at: {
        type: 'timestamptz',
        default: pgm.func('now()'),
      },
    });
  
    pgm.createIndex('tracks', 'artist_id');
  
    // YOUTUBE CONTENT
    pgm.createTable('youtube_content', {
      id: {
        type: 'uuid',
        primaryKey: true,
        default: pgm.func('uuid_generate_v4()'),
      },
      youtube_video_id: {
        type: 'text',
        notNull: true,
        unique: true,
      },
      title: {
        type: 'text',
      },
      channel_name: {
        type: 'text',
      },
      duration_seconds: {
        type: 'integer',
      },
      created_at: {
        type: 'timestamptz',
        default: pgm.func('now()'),
      },
    });
  
    // USER TRACK HISTORY
    pgm.createTable('user_track_history', {
      id: {
        type: 'uuid',
        primaryKey: true,
        default: pgm.func('uuid_generate_v4()'),
      },
      user_id: {
        type: 'uuid',
        notNull: true,
        references: '"users"',
        onDelete: 'cascade',
      },
      track_id: {
        type: 'uuid',
        references: '"tracks"',
        onDelete: 'set null',
      },
      youtube_content_id: {
        type: 'uuid',
        references: '"youtube_content"',
        onDelete: 'set null',
      },
      source: {
        type: 'text',
        notNull: true,
      },
      played_at: {
        type: 'timestamptz',
        default: pgm.func('now()'),
      },
    });
  
    pgm.createIndex('user_track_history', ['user_id', 'played_at']);
  };
  
  exports.down = pgm => {
    pgm.dropTable('user_track_history');
    pgm.dropTable('youtube_content');
    pgm.dropTable('tracks');
    pgm.dropTable('artists');
    pgm.dropTable('users');
  };
  