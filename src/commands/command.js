import * as log from 'log';

class command {

    constructor(name='') {
        this.name = name + '_command';
    }

    execute () { log.noimpl_method(this.name, 'execute'); }

    undo () { log.noimpl_method(this.name, 'undo'); }

}

export default command;
