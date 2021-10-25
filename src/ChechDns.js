const IPv4Regex = /^([0-9]{1,3}\.){3}([0-9]{1,3})$/gm;
export default (ip) =>
    IPv4Regex(ip) &&
    !ip
        .split(".")
        .map((s) => parseInt(s))
        .map((g) => g < 256)
        .some((c) => !c);
