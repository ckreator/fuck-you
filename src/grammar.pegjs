Program
  = __ head:Single tail:(__ Single)* { return [].concat(head).concat(tail) } /
    EOF

Single
  = Assignment / Call

runToken = "run"
stfuToken = "stfu"
assignToken = "assign"


Assignment
  = assignToken _ name:Ident value:Expression _ EOS { return {type: 'assign', name:name.value, value} }

PrimaryExpression
  = Integer / Ident / String

CallExpression
  = runToken _ func:MemberExpression _ args:Arguments EOS /
    runToken _ func:MemberExpression EOS

MemberExpression
  = PrimaryExpression

Arguments
  = _ head:Expression tail:(_ Expression)*

EOS
  = __ stfuToken

EOF
  = !.

Call
  = runToken _ func:Ident _ EOS { return {type: 'call', func} }

Expression
  = Call / PrimaryExpression

String
  = '"' [^"]* '"' { return text() }

Ident "identifier"
  = [a-zA-Z_] [a-zA-Z_0-9]* { return {type: 'ident', value: text()} }

Integer "integer"
  = _ [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = [ \t\n\r]+

__ "maybe whitespace"
  = [ \t\n\r]*
