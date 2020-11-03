type ScriptId = string;
export type CreateScript = (src: string) => Promise<ScriptId | any>;

export const createScript = (src) => {
  return new Promise((resolve, reject) => {
    if(document.getElementById(`async_script${src}`)) {
      return reject();
    }
    const script: HTMLScriptElement = document.createElement('script');
    script.id = `async_script_${src}`;
    script.src = src;
    script.addEventListener('load', () => resolve(script.id));
    script.addEventListener('error', (response) => reject(response));

    document.body.appendChild(script);
  })
}