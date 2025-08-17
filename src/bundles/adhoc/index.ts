/**
 * A single sentence summarising the module (this sentence is displayed larger).
 *
 * Sentences describing the module. More sentences about the module.
 *
 * @module module_name
 * @author Author Name
 * @author Author Name
 */

/*
  To access things like the context or module state you can just import the context
  using the import below
 */
import context from 'js-slang/context';

export function List(): any[] {
  return [];
}

export function append(list: any[], item: any): any[] {
  return [...list, item];
}

export function to_string(item: any): string {
  if (typeof item === 'bigint') {
    return item.toString();
  } else if (Array.isArray(item)) {
    return '[' + item.map(item => to_string(item)).join(', ') + ']';
  } else {
    return JSON.stringify(item);
  }
}
