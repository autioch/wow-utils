const matchesTag = (tag, token) => {
  if (tag.matchesTypes && tag.matchesTypes.some((type) => type === token.type)) {
    return tag.id;
  }

  if (token.type === 'identifier' && tag.matchesText && tag.matchesText.some((identifier) => identifier === token.value)
  ) {
    return tag.id;
  }

  if (token.type === 'command' && tag.machesCommands && tag.machesCommands.some((commandName) => commandName === token.value)) {
    return tag.id;
  }

  return false;
};

module.exports = function setTags(macro, tagsArray) {
  const allTokens = macro.tokenLines.flatMap(({ tokens }) => tokens);
  const tagIds = allTokens.flatMap((token) => tagsArray.map((tag) => matchesTag(tag, token)).filter(Boolean));

  const tags = [...new Set(tagIds)].sort();
  const otherTagId = tagsArray.find((tag) => tag.label === 'OTHER').id;

  if (!tags.length) {
    tags.push(otherTagId);
  }

  return {
    ...macro,
    tags
  };
};
