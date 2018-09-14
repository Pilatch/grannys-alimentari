module Main exposing (main)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import List
import Round exposing (round)
import String.Interpolate exposing (interpolate)


type Cheese
    = Provolone
    | Mozzarella
    | Parmesean
    | Ricotta
    | Toscano


type Pasta
    = Spaghetti
    | Rigatoni
    | Linguini
    | Ravioli Cheese
    | Tortellini Cheese
    | Shells Cheese


type Sauce
    = NoSauce -- We could also use a Maybe Sauce type, instead of having NoSauce.
    | Marinara
    | Pesto


type alias Menu =
    { cheeses : List Cheese
    , pastas : List Pasta
    }



-- What happens when Granny starts selling Linguini with Marinara,
-- and Tortellini with Pesto?


menu : Menu
menu =
    { cheeses = [ Mozzarella, Parmesean, Ricotta, Toscano ]
    , pastas =
        [ Spaghetti
        , Linguini
        , Tortellini Parmesean
        , Tortellini Toscano
        , Ravioli Toscano
        , Shells Ricotta
        ]
    }


cheesePrice : Cheese -> Float
cheesePrice cheese =
    case cheese of
        Provolone ->
            6.79

        Mozzarella ->
            5.69

        Parmesean ->
            4.79

        Ricotta ->
            2.89

        Toscano ->
            5.25


saucePrice sauce =
    case sauce of
        NoSauce ->
            0

        Marinara ->
            1.35

        Pesto ->
            1.49


pastaPrice pasta =
    case pasta of
        Spaghetti ->
            2

        Rigatoni ->
            1.89

        Linguini ->
            1.6

        Ravioli cheese ->
            1.75 + cheesePrice cheese

        Tortellini cheese ->
            2.25 + cheesePrice cheese

        Shells cheese ->
            1.75 + cheesePrice cheese


foodListItem : (food -> Float) -> food -> Html msg
foodListItem pricer food =
    let
        foodPricePerPound =
            round 2 <| pricer food

        foodName =
            Debug.toString food
    in
    li [] [ text <| interpolate "{0} ${1}/lb" [ foodName, foodPricePerPound ] ]


cheesePriceList =
    List.map
        (foodListItem cheesePrice)
        menu.cheeses


pastaPriceList =
    List.map
        (foodListItem pastaPrice)
        menu.pastas


view _ =
    main_ []
        [ node "style" [] [ text styleText ]
        , h1 [] [ text "Granny's Alimentari" ]
        , h2 [] [ text "Menu" ]
        , h3 [] [ text "Cheeses:" ]
        , ul [] cheesePriceList
        , h3 [] [ text "Pastas:" ]
        , ul [] pastaPriceList
        ]


styleText =
    """
        @import url(https://fonts.googleapis.com/css?family=Averia+Serif+Libre%7CMeddon);

        body {
            background: linear-gradient(#fff, #edcc61);
            color: #00333d;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 115%;
            line-height:
        }

        main {
            background-color: #fff;
            border-radius: .5rem;
            box-shadow: .5rem .5rem 1rem .3rem rgba(0, 51, 61, .10);
            margin: 0 auto;
            padding: .5rem 3rem 1rem;
            width: 80%;
        }
        h1 {
            font-family: 'Meddon', cursive;
            font-size: 3rem;
            margin: 0;
        }

        h2 {
            font-family: 'Times New Roman', serif;
            font-size: 4rem;
            letter-spacing: .1em;
            margin: -1rem 1.5rem 0;
            text-align: center;
            text-transform: uppercase;
        }

        h3 {
            border-bottom: .3rem solid rgba(0, 51, 61, .50);
            font-family: 'Averia Serif Libre', cursive;
            font-size: 2rem;
            margin-bottom: .5em;
            padding-bottom: .25em;
        }

        ul {
            margin: 0 0 2rem;
        }

        li, p {
            color: #363630;
            margin: .5em 0;
        }
"""


main =
    Browser.sandbox
        { init = Nothing
        , view = view
        , update = \_ model -> model
        }
