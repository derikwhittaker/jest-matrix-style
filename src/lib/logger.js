let env;

const logger = {
    debug: (...args) => output('Debug', ...args),
    error: (...args) => output('Error', ...args),
    info: (...args) => output('Info', ...args),
    trace: (...args) => output('Trace', ...args),

    setEnv: (_env) => env = _env
};

function output(method, module, message) {
    const format = message
        ? `[${method}] [${module}] - ${message}`
        : `[${method}] - ${module}`;

    if (!/production/i.test(env)) {
        console.log(format);
    }
}

export default logger;
export { logger };
