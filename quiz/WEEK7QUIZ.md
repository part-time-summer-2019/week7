# Week 7 Quiz - React

* Create a new react app.

* The app should have three routes, `/`,`/cars` and `/calculator`

* The `/` route shows a welcome message and has a link to cars and calculator.

## Cars
* The `/cars` route contains a component called `<Cars>`.

* The `<Cars>` component should be a type-ahead search that will allow the user to search for the different models of cars for the year of 2019(hardcoded) for the make that the user types in. The `Cars` component should work as follows
   * It should contain:
     * An `<input>` element of type text where the user can type in the make that they're interested in
     * A `<div>` where you will display the search results of the models that you look up for the make that the user typed in and the fixed year of *2019*
   * As the user types each character into the input text box you need to make a remote call to the url given below
   * You need to receive the results and display the first `10`
   * The results must be displayed as a list of `<MakeAndModel>` components
* The `<MakeAndModel>` component should render a simple `<div>` that contains the `Make` and `Model` displayed in one line
   
* The search should be done by making a remote call to the Vehicle API the returns back the models for a given make and year `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/mercedes/modelyear/2019?format=json`
   * The REST call above can take in any `make` or substring of `make` and will return results for all makes that contain the search string (As an example try hitting the url after substituting `mer` or `merc` for `mercedes`, and you'll see it return results for all makes that contain the string you've filled in) 
   * Details of this and other REST calls offered by the Vehicle API can be found [here](https://vpic.nhtsa.dot.gov/api/) 

* The structure and functionality of the components are the most important, but its also necessary to style them so they look presentable.  

The desired behavior of the component, when implemented correctly, should show a shrinking list of Models as the user continues to type a full car make 




## Calculator
* The `/calculator` route should contain a component `<Calculator>`

* The `<Calculator>` component should be a form that has three elements
  * Two `<label>` / `<input>` pairs that take in two integers. The inputs will be of type text that should validate that the user has entered only integers.
  * One `<select>` drop down that takes in the options `Add` and `Subtract`
  * One Submit `<button>`

* When the Submit button is clicked the component to should take the two integer values entered in the text boxes and pass them on to a separate calculator class along with the selected operation

* The `Calculator` must be separate Javascript class that exposes a single function `calculate` which performs the requested operation on the two inputs and returns the result

* The return result must be displayed on the `<Calculator>` form component
