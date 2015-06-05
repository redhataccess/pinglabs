import command from 'commands/command';

class powerup extends command {
    constructor(name='powerup', shortname='pwr') {
        super(name);
        this.shortname = shortname;
    }

    execute(scale=1) {
    }

}

export default powerup;
