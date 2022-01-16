module.exports = {
  root: true,
  env: { es6: true },
  settings: {
    "react": { version: "17.0.2" },
    "import/parsers": { "@typescript-eslint/parser": [ ".ts", ".tsx" ] },
    "import/resolver": "typescript",
    "import/external-module-folders": [ ".yarn" ]
  },
  parser: "@typescript-eslint/parser",
  plugins: [
    "import",
    "@typescript-eslint/eslint-plugin",
    "react",
    "react-hooks"
  ],
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:json/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  rules: {
    /**
     * Eslint custom rules
     */
    "prettier/prettier": "off",
    "quotes": [ "error", "double" ],
    "quote-props": [ "error", "consistent-as-needed" ],
    "semi": [ "error", "always" ],
    "semi-style": [ "error", "last" ],
    "indent": [
      "error",
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true,
        ignoredNodes: [
          "JSXFragment",
          "JSXOpeningFragment",
          "JSXClosingFragment",
          "JSXIdentifier",
          "JSXNamespacedName",
          "JSXMemberExpression",
          "JSXEmptyExpression",
          "JSXExpressionContainer",
          "JSXElement",
          "JSXClosingElement",
          "JSXOpeningElement",
          "JSXAttribute",
          "JSXSpreadAttribute",
          "JSXText"
        ]
      }
    ],
    "comma-dangle": [ "error", "never" ],
    "no-trailing-spaces": [ "error" ],
    "operator-linebreak": [ "error", "after" ],
    "brace-style": [ "error" ],
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1,
        maxBOF: 0,
        maxEOF: 0
      }
    ],
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "import",
        next: "*"
      },
      {
        blankLine: "any",
        prev: "import",
        next: "import"
      },
      {
        blankLine: "always",
        prev: "expression",
        next: "export"
      },
      {
        blankLine: "always",
        prev: "*",
        next: "multiline-const"
      },
      {
        blankLine: "always",
        prev: "multiline-const",
        next: "*"
      },
      {
        blankLine: "never",
        prev: [ "singleline-const", "singleline-let" ],
        next: [ "singleline-const", "singleline-let" ]
      },
      {
        blankLine: "always",
        prev: "*",
        next: [
          "if",
          "for",
          "try",
          "switch",
          "do",
          "while"
        ]
      },
      {
        blankLine: "always",
        prev: "*",
        next: "expression"
      },
      {
        blankLine: "never",
        prev: "expression",
        next: "expression"
      },
      {
        blankLine: "always",
        prev: "*",
        next: "multiline-expression"
      },
      {
        blankLine: "always",
        prev: "*",
        next: "return"
      }
    ],
    "padded-blocks": [
      "error",
      {
        blocks: "never",
        switches: "never"
      }
    ],
    "keyword-spacing": [ "error" ],
    "space-before-blocks": [ "error" ],
    "space-in-parens": [ "error", "never" ],
    "array-bracket-newline": [
      "error",
      {
        multiline: true,
        minItems: 3
      }
    ],
    "array-element-newline": [
      "error",
      {
        ArrayExpression: {
          multiline: true,
          minItems: 3
        },
        ArrayPattern: {
          multiline: true,
          minItems: 3
        }
      }
    ],
    "array-bracket-spacing": [ "error", "always" ],
    "object-shorthand": [ "error" ],
    "object-curly-spacing": [ "error", "always" ],
    "object-property-newline": [ "error", { allowAllPropertiesOnSameLine: false } ],
    "object-curly-newline": [
      "error",
      {
        ObjectExpression: {
          multiline: true,
          minProperties: 3
        },
        ObjectPattern: {
          multiline: true,
          minProperties: 3
        },
        ImportDeclaration: {
          multiline: true,
          minProperties: 3
        },
        ExportDeclaration: {
          multiline: true,
          minProperties: 3
        }
      }
    ],
    "key-spacing": [
      "error",
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    "dot-location": [ "error", "property" ],
    "comma-style": [ "error", "last" ],
    "comma-spacing": [
      "error",
      {
        before: false,
        after: true
      }
    ],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always"
      }
    ],
    "arrow-spacing": [
      "error",
      {
        before: true,
        after: true
      }
    ],
    "block-spacing": [ "error", "always" ],
    "no-multi-spaces": [ "error" ],
    "template-curly-spacing": [ "error", "never" ],
    "computed-property-spacing": [ "error", "always" ],
    "one-var-declaration-per-line": [ "error", "always" ],
    "function-call-argument-newline": [ "error", "consistent" ],
    "no-async-promise-executor": [ "warn" ],
    "arrow-parens": [ "error", "as-needed" ],
    "space-infix-ops": [ "error" ],
    "no-restricted-imports": [ 2, { patterns: [ "../../*" ] } ],
    "no-restricted-modules": [ 2, { patterns: [ "../../*" ] } ],
    "no-console": [ "warn", { allow: [ "warn", "error" ] } ],
    "no-alert": [ "warn" ],
    "no-control-regex": "off",
    "import/no-unresolved": [ "off" ],
    "import/namespace": [ "off" ],
    "import/no-named-as-default": [ "off" ],
    "import/newline-after-import": [ "error" ],
    "import/no-useless-path-segments": [
      "error",
      {
        noUselessIndex: true,
        commonjs: true
      }
    ],
    "import/extensions": [
      "error",
      "never",
      {
        jpg: "always",
        jpeg: "always",
        gif: "always",
        pdf: "always",
        svg: "always",
        png: "always",
        api: "always"
      }
    ],
    "import/no-relative-parent-imports": "off",
    "import/export": [ "error" ],
    "import/no-unused-modules": [ "error" ],
    "import/first": [ "error" ],
    "import/no-duplicates": [ "error" ],
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        "groups": [
          "builtin",
          "external",
          "internal",
          [
            "parent",
            "index",
            "sibling"
          ],
          "object",
          "unknown"
        ],
        "pathGroups": [
          {
            pattern: "@nestjs/**",
            group: "external"
          },
          {
            pattern: "@libs/**",
            group: "internal"
          },
          {
            pattern: "@packages/**",
            group: "internal"
          },
          {
            pattern: "src/**",
            group: "internal"
          },
          {
            pattern: "assets/**",
            group: "internal",
            position: "after"
          }
        ],
        "pathGroupsExcludedImportTypes": [ "builtin" ]
      }
    ],
    "json/*": [ "error", { allowComments: true } ],
    /**
     * Typescript custom rules
     */
    "@typescript-eslint/semi": [ "error", "always" ],
    "@typescript-eslint/quotes": [ "error", "double" ],
    "@typescript-eslint/ban-ts-comment": [ "warn" ],
    "@typescript-eslint/explicit-function-return-type": [ "off" ],
    "@typescript-eslint/no-use-before-define": [ "off" ],
    "@typescript-eslint/no-unused-vars": [ "warn", { argsIgnorePattern: "^_" } ],
    "@typescript-eslint/camelcase": [ "off" ],
    "@typescript-eslint/no-empty-function": [ "warn" ],
    "@typescript-eslint/type-annotation-spacing": [
      "error",
      {
        before: false,
        after: true,
        overrides: {
          arrow: {
            before: true,
            after: true
          }
        }
      }
    ],
    "@typescript-eslint/array-type": [
      "error",
      {
        default: "array-simple",
        readonly: "array-simple"
      }
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "typeLike",
        format: [ "PascalCase" ]
      },
      {
        selector: "enumMember",
        format: [ "UPPER_CASE", "PascalCase" ]
      }
    ],
    /**
     * React custom rules
     */
    "react/jsx-indent": [
      "error",
      2,
      {
        checkAttributes: true,
        indentLogicalExpressions: true
      }
    ],
    "react/react-in-jsx-scope": "off",
    "react/jsx-indent-props": [ "error", 2 ],
    "react/jsx-fragments": [ "error", "syntax" ],
    "react/jsx-one-expression-per-line": [ "error", { allow: "none" } ],
    "react/prop-types": [ "off" ],
    "react/display-name": [ "off" ],
    "react/no-unescaped-entities": [ "off" ],
    "react/no-array-index-key": [ "error" ],
    "react/no-children-prop": [ "off" ],
    "react/jsx-curly-brace-presence": [
      "error",
      {
        props: "never",
        children: "never"
      }
    ],
    "react/jsx-curly-newline": [
      "error",
      {
        multiline: "consistent",
        singleline: "consistent"
      }
    ],
    "react/jsx-curly-spacing": [
      "error",
      {
        when: "never",
        allowMultiline: false,
        children: true
      }
    ],
    "react/jsx-boolean-value": [ "error", "never" ],
    "react/jsx-closing-tag-location": [ "error" ],
    "react/jsx-closing-bracket-location": [ "error", "tag-aligned" ],
    "react/jsx-tag-spacing": [
      "error",
      {
        closingSlash: "never",
        beforeSelfClosing: "always",
        afterOpening: "never",
        beforeClosing: "never"
      }
    ],
    "react/style-prop-object": [ "error" ],
    "react/jsx-max-props-per-line": [
      "error",
      {
        when: "always",
        maximum: 1
      }
    ],
    "react/jsx-first-prop-new-line": [ "error", "multiline" ],
    "react/jsx-wrap-multilines": [
      "error",
      {
        declaration: "parens-new-line",
        assignment: "parens-new-line",
        return: "parens-new-line",
        arrow: "parens-new-line",
        condition: "parens-new-line",
        logical: "parens-new-line",
        prop: "parens-new-line"
      }
    ],
    "react/jsx-no-target-blank": [
      "error",
      {
        allowReferrer: true,
        enforceDynamicLinks: "always",
        warnOnSpreadAttributes: true
      }
    ],
    "react/jsx-newline": [ "error", { prevent: false } ],
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true
      }
    ],
    "react-hooks/rules-of-hooks": [ "error" ],
    "react-hooks/exhaustive-deps": [ "error" ]
  },
  overrides: [
    {
      files: [ "*.js" ],
      rules: {
        "no-undef": "off",
        "@typescript-eslint/no-var-requires": [ "off" ]
      }
    },
    {
      files: [ "*.json" ],
      rules: {
        "object-curly-newline": [ "off" ],
        "quote-props": [ "off" ],
        "semi": [ "off" ],
        "array-bracket-newline": [ "error", { minItems: 1 } ],
        "array-element-newline": [
          "error",
          {
            ArrayExpression: {
              multiline: true,
              minItems: 1
            },
            ArrayPattern: {
              multiline: true,
              minItems: 1
            }
          }
        ],
        "@typescript-eslint/semi": [ "off" ]
      }
    },
    {
      files: [ "*.ts", "*.tsx" ],
      rules: { "no-undef": 0 }
    }
  ]
};
