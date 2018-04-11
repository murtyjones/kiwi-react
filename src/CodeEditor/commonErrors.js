import React, { Component } from 'react'

export default {
  'ZeroDivisionError': {
    html: `
      <div class='hint'>
        It looks like you tried to do a math operation (divide or modulo) on a number using zero as the denominator, which is <u>impossible</u>! 
        <br /><br />
        <b>Example:</b>
        <div class='hintExampleCode'>
          numerator = 10<br />
          denominator = 5 - 4 - 1<br />
          print numerator / denominator<br />
        </div>
        The number above will try to divide 10 by 0, which is impossible!
        <br /><br />
        To double check that your numbers (including variable numbers!) are not zero, try printing them out.
      </div>
    `
  },
  'object has no attribute': {
    html: `
      <div class='hint'>
        You tried to access a property that does not exist in this object. 
        <br /><br />
        <b>Example:</b>
        <div class='hintExampleCode'>
          fruits = { "apple": "yum!" }<br />
          print fruits.banana<br />
        </div>
        This will produce an error because there is no "banana" in the fruits object.
      </div>
    `
  },
  'too many values to unpack': {
    html: `
      <div class='hint'>
        You tried to take some values out of a tuple, but not all of them!
        <br /><br />
        <b>Example:</b>
        <div class='hintExampleCode'>
          def myTupleFunction():<br />
          &nbsp;&nbsp;return (0, 1, 2)<br />
          x, y = myTupleFunction()<br />
          print x<br />
          print y<br />
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
    html: `
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
    html: `
      <div class='hint'>
        You tried to do math on two seperate types of items.
        <br /><br />
        <b>Example:</b>
        <div class='hintExampleCode'>
          <div class='hintCheckmark'></div>print 1 + 2 <div class='hintComment'># prints 3</div><br />
          <div class='hintCheckmark'></div>print 'I can ' + 'code!' <div class='hintComment'># prints I can code!</div><br />
          <div class='hintX'></div>print 1 + 'not a number' <div class='hintComment'># doesn't work!</div><br />      
        </div>
      </div>
    `
  },
  'object is not iterable': {
    html: `
      <div class='hint'>
        You tried to use a loop on something that isn't a list!
        <br /><br />
        <b>Example:</b>
        <div class='hintExampleCode'>
            number = 100000<br />
            for each_digit in number:<br />
            &nbsp;&nbsp;print each_digit<br />
        </div>
        In this example, you need to turn the <i>number</i> variable into a list:
        <div class='hintExampleCode'>
            number = 100000<br />
            number_list = [int(d) for d in str(number)]<br />
            for each_digit in number_list:<br />
            &nbsp;&nbsp;print each_digit<br />
        </div>
      </div>
    `
  },
  'must be a': {
    html: `
      <div class='hint'>
        You tried to use the wrong type of object in a function.
        <br /><br />
        <b>Example:</b>
        <div class='hintExampleCode'>
          <div class='hintCheckmark'></div>print int('6') + 1 <div class='hintComment'># prints 7</div><br />
          <div class='hintX'></div>print int([]) + 1 <div class='hintComment'># doesn't work!</div><br />
        </div>
      </div>
    `
  },
  'index out of range': {
    html: `
      <div class='hint'>
        You tried to access something in a list that isn't there!
        <br /><br />
        <b>Example:</b>
        <div class='hintExampleCode'>
          fruits = ['apple', 'orange']<br />
          <div class='hintCheckmark'></div>print fruits[0] <div class='hintComment'># prints apple</div><br />
          <div class='hintCheckmark'></div>print fruits[1] <div class='hintComment'># prints orange</div><br />
          <div class='hintX'></div>print fruits[2] <div class='hintComment'># doesn't work!</div><br />
        </div>
      </div>
    `
  },
  "cannot concatenate 'str' and": {
    html: `
      <div class='hint'>
        You tried to add a number to a string!
        <br /><br />
        <b>Example:</b>
        
        
        <div class='hintExampleCode'>
          <div class='hintX'></div>print 'this is a string' + 1 <div class='hintComment'># doesn't work!</div><br />
        </div>
        
        <br />
        Instead, when you need to add a number to a string, do this: 
        <div class='hintExampleCode'>
          <div class='hintCheckmark'></div>print 'this is a string' + str(1)<br/>
          <div class='hintComment'># prints this is a string1</div><br />
        </div>
      </div>
    `
  },
  'does not match any outer indentation level': {
    html: `
      <div class='hint'>
        Check the indents in your code!
      </div>
    `
  },
  'EOF in multi-line': {
    html: `
      <div class='hint'>
        The quotations marks in your string need to be fixed!
        <br /><br />
        <b><div style="margin-right: 5px" class='hintX'></div>Example:</b>
        <div class='hintExampleCode'>
          print """<br/>
          this is a string<br/>
          "
        </div>
        <br />
        <b><div style="margin-right: 5px" class='hintCheckmark'></div>Example:</b> 
        <div class='hintExampleCode'>
          print """<br/>
          this is a string<br/>
          """
        </div>
      </div>
    `
  }
}
