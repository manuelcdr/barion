import { PessoasPipe } from './pessoas.pipe';

describe('PessoasPipe', () => {
  it('create an instance', () => {
    const pipe = new PessoasPipe();
    expect(pipe).toBeTruthy();
  });
});
