import * as log from 'log';

class Command {

    constructor() {
        this.name = 'Command';
    }

    execute () { log.noimpl_method(this.name, 'execute'); }

    undo () { log.noimpl_method(this.name, 'undo'); }

    destroy () { /* this probably isn't needed, no memory allocs ;) */ }

}

export default Command;
