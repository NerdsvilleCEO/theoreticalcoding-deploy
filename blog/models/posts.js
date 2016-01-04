var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Post = new keystone.List('Post', {
  /* SEO URL */
  autokey: { path: 'slug', from: 'title', unique: true },
  map: { name: 'title' },
  defaultSort: '-createdAt',
  drilldown: 'author'
});

Post.add({
  /* Rich and well documented type definitions on the keystonejs website */
  title: { type: String, required: true, index: true },
  /* One-to-One Relationship to other lists */
  author: { type: Types.Relationship, ref: 'User' },
  content: {
    short: { type: Types.Html, wysiwyg: true, height: 150 },
    extended: { type: Types.Html, wysiwyg: true, height: 400 }
  },
  state: { type: Types.Select, options: 'Draft, Published, Archived', default: 'Draft' },
  createdAt: { type: Date, default: Date.now },
  publishedAt: Date,

  /* Many-to-many relationship to other lists */
  categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
});

/* Allows you to utilize full mongoose API to do complex queries on documents such as concatenating results from other documents */
Post.schema.virtual('content.full').get(function(){
  return this.content.extended || this.content.brief;
});

/* Allows you to view comments by post */
Post.relationship({ path: 'comments', ref: 'PostComment', refPath: 'post' });

Post.defaultColumns = 'title, state|20%, author, publishedAt|15%';
Post.register();
