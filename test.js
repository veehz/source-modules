
import torch from 'webgpu-torch';

(async () => {
    let x = torch.tensor([1, 2, 3]);
    let y = await x.toArrayAsync();

    let x2 = torch.tensor([4, 5, 6]);

    torch.add(x, x2);

    console.log(await torch["add"](x, x2).toArrayAsync());
    console.log(y);
})();
