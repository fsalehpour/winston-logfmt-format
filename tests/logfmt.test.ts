import logfmt from '../src/logfmt';

describe('logfmt', () => {
    it.each`
    level | message | meta | expected
    ${'info'} | ${undefined} | ${undefined} | ${'level=info message='}
    ${'info'} | ${undefined} | ${{a: 123}} | ${'level=info message= a=123'}
    ${'warning'} | ${"be warned"} | ${{a:55}} | ${'level=warning message="be warned" a=55'}
    ${'error'} | ${"erred"} | ${{a:"foo", b:{c:"bar"}}} | ${'level=error message=erred a=foo b_c=bar'}
    ${'info'} | ${"real me"} | ${{foo: {barBaz:123.4567}}} | ${'level=info message="real me" foo_bar_baz=123.4567'}
    `('returns $expected when $info level $message message is passed with $meta meta', ({level, message, meta, expected}) => {
        const i = logfmt().transform({level, message, meta});
        if (typeof i === 'boolean') {
            fail();
        }
        expect(i.message).toBe(expected);
    });
});