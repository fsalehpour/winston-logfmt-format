import {format, TransformableInfo} from "logform";
import fmt from "logfmt";
import decamelize from "decamelize";
import flatten from "flat";

function getFlattenedMeta(meta: Object): Object {
    if (!meta) {
        return {};
    }
    return flatten(meta, {delimiter: '_', transformKey: decamelize});
}

export default format((info): TransformableInfo | boolean => {
    info.message = fmt.stringify({
        level: info.level,
        message: info.message,
        ...getFlattenedMeta(info.meta),
    });
    return info;
});