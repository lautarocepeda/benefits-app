export class ImageSnippet {
    pending: boolean = false;
    status: string = null;


    constructor(public src: string, public file: File) { }
}
