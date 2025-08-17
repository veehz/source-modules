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
import torch from 'webgpu-torch';

// /**
//  * Sample function. Increments a number by 1.
//  *
//  * @param x The number to be incremented.
//  * @returns The incremented value of the number.
//  */
// export function sample_function(x: number): number {
//   return ++x;
// } // Then any functions or variables you want to expose to the user is exported from the bundle's index.ts file

function bigint_to_int_recursive(data: any[]): any[] {
  return data.map(item => {
    if (typeof item === 'bigint') {
      return Number(item);
    } else if (Array.isArray(item)) {
      return bigint_to_int_recursive(item);
    } else {
      return item;
    }
  });
}

export function Tensor(data: any[]): torch.Tensor {
  data = bigint_to_int_recursive(data);
  console.log(data);
  const res = torch.tensor(data);
  console.log(res);
  return res;
}

// export function add(a: torch.Tensor, b: torch.Tensor): torch.Tensor {
//   const result = torch.add(a, b);
//   console.log(result);
//   return result;
// }

export async function toList(a: torch.Tensor): Promise<any[]> {
  const result = await a.toArrayAsync();
  console.log(result);
  return result;
}

export async function await_log(p: Promise<any>): Promise<void> {
  console.log(await p);
}

export function test(x: number, y: number = BigInt(1)) {
  console.log(x);
  return x + y;
}