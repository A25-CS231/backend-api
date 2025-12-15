const { nanoid } = require('nanoid');

const generateUserId = () => `user-${nanoid(16)}`;

module.exports = { generateUserId }