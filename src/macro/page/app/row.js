import tag from './tag';
import content from './content';

export default function row(macro, index) {
  // const clearsErrors = macro.content.includes('/script UIErrorsFrame:Clear()');

  return tag('tr', '', [
    // tag('td', '', index),
    // tag('td', '', macro.index),
    // tag('td', '', macro.id),
    // tag('td', '', macro.prefix),
    // tag('td', '', macro.hasCustomIcon ? macro.icon : ''),
    tag('td', '', macro.label.join(', ')),

    // tag('td', '', macro.clusterId),

    // tag('td', 'macro__tooltip', macro.tooltip || ''),
    // tag('td', 'macro__error', clearsErrors ? 'Yes' : ''),
    // tag('td', '', macro.account || ''),
    // tag('td', '', macro.realm || ''),
    // tag('td', '', macro.character || ''),
    // tag('td', '', macro.filename),

    tag('td', 'macro__content', content(macro))
  ]);
}
