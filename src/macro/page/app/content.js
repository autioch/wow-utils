import tag from './tag';
import './content.scss';

export default function contentView({ content }) {
  return content.map((line) => {
    if (line.startsWith('/script')) {
      return tag('div', 'content__script', line);
    }

    if (line.startsWith('/cast')) {
      return tag('div', 'content__cast', line);
    }

    if (line.startsWith('/use')) {
      return tag('div', 'content__use', line);
    }

    if (line.startsWith('/startattack')) {
      return tag('div', 'content__startattack', line);
    }

    if (line.startsWith('/run')) {
      return tag('div', 'content__run', line);
    }

    return tag('div', 'content__', line);
  });
}
