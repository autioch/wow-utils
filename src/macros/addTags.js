const { flattenDeep } = require('lodash');

const matchesTag = (tag, token) => {
  if (tag.tokenTypes && tag.tokenTypes.some((type) => type === token.type)) {
    return tag.id;
  }

  if (token.type === 'identifier' && tag.identifiers && tag.identifiers.some((identifier) => identifier === token.value)
  ) {
    return tag.id;
  }

  if (token.type === 'command' && tag.commandNames && tag.commandNames.some((commandName) => commandName === token.value)) {
    return tag.id;
  }

  return false;
};

const isId = (id) => id !== false;

module.exports = function setTags(tokenizedMacros, tagsArray) {
  const tagged = tokenizedMacros.map((macro) => ({
    ...macro,
    tags: [...new Set(flattenDeep(macro.lines).map((token) => tagsArray.map((tag) => matchesTag(tag, token))).filter(isId))].sort()
  }));

  const otherTagId = tagsArray.find((tag) => tag.label === 'OTHER').id;

  tagged
    .filter((macro) => !macro.tags.length)
    .forEach((macro) => {
      macro.tags.push(otherTagId);
    });

  return tagged;
};
