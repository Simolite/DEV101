<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
    function getPermutations($word) {
        $results = [];

        // Base case: if the string is just one character, return it as an array
        if (strlen($word) <= 1) {
            return [$word];
        }

        // Loop through each character in the word
        for ($i = 0; $i < strlen($word); $i++) {
            // Get the current character
            $currentChar = $word[$i];

            // Get the remaining characters by removing the current character
            $remainingChars = substr($word, 0, $i) . substr($word, $i + 1);

            // Recursively get permutations of the remaining characters
            $permutations = getPermutations($remainingChars);

            // Add the current character to the front of each permutation
            foreach ($permutations as $perm) {
                $results[] = $currentChar . $perm;
            }
        }

        return array_unique($results);
    }

    // Example usage:
    $word = "Hello";
    $permutations = getPermutations($word);

    echo "Permutations of '{$word}':<br>";
    print_r($permutations);
    ?>

</body>
</html>