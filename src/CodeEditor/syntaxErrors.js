import React, { Component } from 'react'
import getReservedKeyword from './getReservedKeyword'

export const COMMON_ERRORS = {
  'ZeroDivisionError': {
    makeHtml: () => `
      <div class='hint'>
        It looks like you tried to do a math operation (divide or modulo) on a number using zero as the denominator, which is <u>impossible</u>! 
        <br /><br />
        <b>Example:</b>
        <div class='hintExampleCode'>
          numerator = 10<br />
          denominator = 5 - 4 - 1<br />
          print(numerator / denominator)<br />
        </div>
        The number above will try to divide 10 by 0, which is impossible!
        <br /><br />
        To double check that your numbers (including variable numbers!) are not zero, try printing them out.
      </div>
    `
  },
  'object has no attribute': {
    makeHtml: () => `
      <div class='hint'>
        You tried to access a property that does not exist in this object. 
        <br /><br />
        <b>Example:</b>
        <div class='hintExampleCode'>
          fruits = { "apple": "yum!" }<br />
          print(fruits.banana)<br />
        </div>
        This will produce an error because there is no "banana" in the fruits object.
      </div>
    `
  },
  'too many values to unpack': {
    makeHtml: () => `
      <div class='hint'>
        You tried to take some values out of a tuple, but not all of them!
        <br /><br />
        <b>Example:</b>
        <div class='hintExampleCode'>
          def myTupleFunction():<br />
          &nbsp;&nbsp;return (0, 1, 2)<br />
          x, y = myTupleFunction()<br />
          print(x)<br />
          print(y)<br />
        </div>
        Line three in this example should be:
        <div class='hintExampleCode'>
          x, y, z = myTupleFunction()
        </div>
        Because there are three values (1, 2, 3) in the tuple.
      </div>
    `
  },
  "invalid string (possibly contains a unicode character)": {
    makeHtml: () => `
      <div class='hint'>
        You tried to use a character that isn't allowed!
        <br /><br />
        <b>Example:</b>
        <div class='hintExampleCode'>
          name = 'My name is λ'<br />
        </div>
        Weird characters, like λ in this example, are not allowed in strings!
      </div>
    `
  },
  'unsupported operand type(s)': {
    makeHtml: () => `
      <div class='hint'>
        You tried to do math on two seperate types of items.
        <br /><br />
        <b>Example:</b>
        <div class='hintExampleCode'>
          <div class='hintCheckmark'></div>print(1 + 2)<div class='hintComment'># prints <b>3</b></div><br />
          <div class='hintCheckmark'></div>print("I can " + "code!") <div class='hintComment'># prints <b>I can code!</b></div><br />
          <div class='hintX'></div>print(1 + "not a number") <div class='hintComment'># doesn't work!</div><br />      
        </div>
      </div>
    `
  },
  'object is not iterable': {
    makeHtml: () => `
      <div class='hint'>
        You tried to use a loop on something that isn't a list!
        <br /><br />
        <b>Example:</b>
        <div class='hintExampleCode'>
            number = 100000<br />
            for each_digit in number:<br />
            &nbsp;&nbsp;print(each_digit)<br />
        </div>
        In this example, you need to turn the <i>number</i> variable into a list:
        <div class='hintExampleCode'>
            number = 100000<br />
            number_list = [int(d) for d in str(number)]<br />
            for each_digit in number_list:<br />
            &nbsp;&nbsp;print(each_digit)<br />
        </div>
      </div>
    `
  },
  'must be a': {
    makeHtml: () => `
      <div class='hint'>
        You tried to use the wrong type of item in a function.
        <br /><br />
        <b>Example:</b>
        <div class='hintExampleCode'>
          <div class='hintCheckmark'></div>int("6") <div class='hintComment'># turns "6" from a string into a number</div><br />
          <div class='hintX'></div>int("hi") <div class='hintComment'># doesn't work because 'hi' isn't a number!</div><br />
        </div>
      </div>
    `
  },
  'index out of range': {
    makeHtml: () => `
      <div class='hint'>
        You tried to access something in a list that isn't there!
        <br /><br />
        <b>Example:</b>
        <div class='hintExampleCode'>
          fruits = ['apple', 'orange']<br />
          <div class='hintCheckmark'></div>print(fruits[0]) <div class='hintComment'># prints <b>apple</b></div><br />
          <div class='hintCheckmark'></div>print(fruits[1]) <div class='hintComment'># prints <b>orange</b></div><br />
          <div class='hintX'></div>print(fruits[2]) <div class='hintComment'># doesn't work!</div><br />
        </div>
      </div>
    `
  },
  "cannot concatenate 'str' and": {
    makeHtml: () => `
      <div class='hint'>
        You tried to add a number to a string!
        <br /><br />
        <b>Example:</b>
        
        
        <div class='hintExampleCode'>
          <div class='hintX'></div>print("this is a string" + 1) <div class='hintComment'># doesn't work!</div><br />
        </div>
        
        <br />
        Instead, when you need to add a number to a string, do this: 
        <div class='hintExampleCode'>
          <div class='hintCheckmark'></div>print("this is a string: " + str(1))<br />
          <div class='hintComment'># prints <b>this is a string: 1</b></div><br />
        </div>
      </div>
    `
  },
  'EOF in multi-line': {
    makeHtml: () => `
      <div class='hint'>
        The quotations marks in your string need to be fixed!
        <br /><br />
        <b><div style="margin-right: 5px" class='hintX'></div>Example:</b>
        <div class='hintExampleCode'>
          print("""<br />
          this is a string<br />
          ")
        </div>
        <br />
        <b><div style="margin-right: 5px" class='hintCheckmark'></div>Example:</b> 
        <div class='hintExampleCode'>
          print("""<br />
          this is a string<br />
          """)
        </div>
      </div>
    `
  },
  'is not defined': {
    makeHtml: () => `
      <div class='hint'>
        You tried to use a variable or function that does not exist!
        <br /><br />
        <b><div style="margin-right: 5px" class='hintX'></div>Example:</b>
        <div class='hintExampleCode'>
          print(name) # doesn't work!
        </div>
        <br />
        <b><div style="margin-right: 5px" class='hintCheckmark'></div>Example:</b> 
        <div class='hintExampleCode'>
          name = "Marty"<br />
          print(name) # prints Marty<br />
        </div>
      </div>
    `
  },
  'bad token': {
    makeHtml: () => `
      <div class='hint'>
        Did you forget a quotation mark at the end of one of your print statements?
      </div>
    `
  },
  'bad input': {
    makeHtml: () => `
      <div class='hint'>
        Did you forget a quotation mark at the beginning of one of your print statements?
      </div>
    `
  }
}

export const CUSTOM_ERRORS = {

  reservedKeyword: {
    test: (input, errorMsg) => {
      return input && errorMsg && errorMsg.includes('bad input')
      && getReservedKeyword(input)
    },
    makeHtml: input => {
      const invalidVarName = getReservedKeyword(input)
      return `
        <div class='hint'>
          In Python, certain words can't be used as variable names. You cannot create a variable named <b>"${invalidVarName}"</b>! 
        </div>
      `
    }
  },

  capitalPrint: {
    test: input => input && (input.includes('Print') || input.includes('PRINT')),
    makeHtml: () => `
      <div class='hint'>
        Make sure that all of your print statements are lowercase! 
        <br /><br />
        <b>Example:</b>
        <div class='hintExampleCode'>
          <div class='hintX'></div>Print("Hello!") <div class='hintComment'># doesn't work!</div><br />      
          <div class='hintCheckmark'></div>print("Hello!") <div class='hintComment'># prints <b>Hello!</b></div><br />
        </div>
      </div>
    `
  },
  capitalIf: {
    test: input => input && (input.includes('If') || input.includes('IF')),
    makeHtml: () => `
      <div class='hint'>
        Make sure that all of your if statements are lowercase! 
        <br /><br />
        <b><div style="margin-right: 5px" class='hintX'></div>Example:</b>
        <div class='hintExampleCode'>
          If 1 == 1:<br />
            print("Hello!") # doesn't work<br />
        </div>
        <br />
        <b><div style="margin-right: 5px" class='hintCheckmark'></div>Example:</b> 
        <div class='hintExampleCode'>
          if 1 == 1:<br />
            print("Hello!") # prints Hello!<br />
        </div>
      </div>
    `
  },
}