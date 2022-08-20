// Stack
// 1. Pop
// 2. Push
// 3. Peek -> Just to check the topmost element in the Stack
// 4. Display the elements in the stack

function Stack() {
    let nums = [];

    this.push = function (val) {
        nums.splice(nums.length, 0, val);
    }

    this.pop = function () {
        if (nums.length === 0) {
            throw new Error("No elements in stack.");
        }
        return nums.splice(nums.length - 1, 1);
    }

    this.peek = function () {
        if (nums.length === 0) {
            throw new Error("No elements in stack.");
        }
        return nums.slice(-1);
    }

    this.display = function () {
        console.log(`Elements: [${nums}].`);
    }
}

