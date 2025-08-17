
import torch from 'webgpu-torch';

(async () => {
    let x = torch.tensor([1, 2, 3]);
    let y = await x.toArrayAsync();
})();
