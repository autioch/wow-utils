import tag from './tag';
import row from './row';
import './table.scss';

export default function view(groups) {
  groups.forEach((group) => {
    document.body.appendChild(tag('h4', '', `${group.label} - ${group.macros.length} macros`));
    document.body.appendChild(tag('h5', '', `Keywords: ${group.keywords.join(', ')}`));
    document.body.appendChild(tag('table', '', [
    // tag('tr', '', [
    //   // tag('th', 'small', 'Lp'),
    //   // tag('th', 'small', 'I'),
    //   // tag('th', 'small', 'Id'),
    //   // tag('th', 'small', 'P'),
    //   // tag('th', '', 'Icon'),
    //   tag('th', '', 'Label'),
    //   tag('th', '', 'Cluster'),
    //
    //   // tag('th', '', 'Tooltip'),
    //   // tag('th', '', 'Clear errors'),
    //   // tag('th', '', 'Account'),
    //   // tag('th', '', 'Realm'),
    //   // tag('th', '', 'Character'),
    //   // tag('th', '', 'Filename'),
    //   tag('th', 'macro__content', 'Content')
    // ])
    ].concat(group.macros.map(row))));
  });
}
