const segmentsFromAtoM = [
  ["C", "B", "A"],
  ["G", "F", "E"],
  ["G", "H", "I"],
  ["K", "J", "I"],
  ["C", "D", "E"],
  ["K", "L", "M"],
]

const segmentsFromMtoA = [
  ["A", "B", "C"],
  ["G", "F", "E"],
  ["G", "H", "I"],
  ["K", "J", "I"],
  ["C", "D", "E"],
  ["K", "L", "M"],
  ["Hello", "world", "!!"],
]

const reconstituteSegment = (segments) => {
  let result = segments.shift();

  while (segments.length) {
    const matchingSegment = popFirstMatchingSegment(segments, result);
    if (matchingSegment)
      result = concatenateSegments(result, matchingSegment);
    else {
      console.error("there is", segments.length, "elem(s) not linked =>", segments);
      break;
    }
  }
  return result;
}

const popFirstMatchingSegment = (segments, segmentToMatch) => {
  const leftBounderyToMatch = segmentToMatch[0];
  const rightBounderyToMatch = segmentToMatch[segmentToMatch.length - 1];
  for (let index = 0; index < segments.length; index++) {
    const leftBoundery = segments[index][0];
    const rightBoundery = segments[index][segments[index].length - 1];

    if (leftBoundery === leftBounderyToMatch
      || leftBoundery === rightBounderyToMatch
      || rightBoundery === leftBounderyToMatch
      || rightBoundery === rightBounderyToMatch) {
      return segments.splice(segments.indexOf(segments[index]), 1)[0];
    }
  }
}

const concatenateSegments = (segment1, segment2) => {
  const leftBounderySegment1 = segment1[0];
  const leftBounderySegment2 = segment2[0];
  const rightBounderySegment1 = segment1[segment1.length - 1];
  const rightBounderySegment2 = segment2[segment2.length - 1]
  if (leftBounderySegment1 === leftBounderySegment2) {
    segment2.reverse();
    segment2.splice(segment2.length - 1, 1)
    segment1.unshift(...segment2)
  }
  else if (rightBounderySegment2 === rightBounderySegment1) {
    segment2.reverse();
    segment2.splice(0, 1)
    segment1.push(...segment2)
  } else if (leftBounderySegment1 === rightBounderySegment2) {
    segment2.splice(segment2.length - 1, 1)
    segment1.unshift(...segment2)
  } else if (rightBounderySegment1 === leftBounderySegment2) {
    segment2.splice(0, 1)
    segment1.push(...segment2)
  }
  return (segment1)
}

console.log(reconstituteSegment(segmentsFromAtoM), "sorted From A to M");
console.log(reconstituteSegment(segmentsFromMtoA), "sorted From M to A")