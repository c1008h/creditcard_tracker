from flask import Blueprint, jsonify, request
import json

bp = Blueprint('cards', __name__, url_prefix='/api')

# Load data from the JSON file
with open('./data/data.json', 'r') as file:
    card_data = json.load(file)

# All Cards and Info
@bp.route('/cards')
def get_all_cards():
    return jsonify(card_data)

# Single Card by index
@bp.route('/cards/<int:index>')
def get_card(index):
    if 0 <= index < len(card_data):
        return jsonify(card_data[index])
    else:
        return "Card not found", 404
    
# all cash back
@bp.route('/cashback')
def get_all_cashback():
    all_cashback = []
    for card in card_data:
        if 'CashBack' in card:
            card_name = card['Card']
            for cashback in card['CashBack']:
                all_cashback.append({
                    "Card": card_name,
                    "CashBack": cashback
                })
    return jsonify(all_cashback)

@bp.route('/search-cashback', methods=['GET'])
def search_cashback(searched_item):
    print("Hello, world!")
    matching_cards = []

    for card in card_data:
        for category, details in card.get('CashBack', {}).items():
            if searched_item.lower() in category.lower():
                for item in details:
                    cashback_amount = item.get('amount', '')
                    matching_cards.append({
                        'Card': card['Card'],
                        'CashBack': cashback_amount,
                    })

    return matching_cards

    # Example usage: Replace 'YourSearchedItem' with the actual searched item from user input
    searched_item = 'Amazon'
    matching_cards = search_cards(searched_item)

    # Print or return the matching cards
    print(matching_cards)
