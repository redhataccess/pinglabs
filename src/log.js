function noimpl_method(name, fn) {
    console.warn(`Attempted to invoke ${name}.prototype.${fn}, but it is not implemented.`);
}

export { noimpl_method };
